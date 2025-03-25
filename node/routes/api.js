import express from "express";
import { errorHandler } from "./errorHandler.js";
import CustomerController from "../database/controllers/customerController.js";
import ProductController from "../database/controllers/productController.js";
import OrderController from "../database/controllers/orderController.js";
import OrderStatusController from "../database/controllers/orderStatusController.js";
import ReviewController from "../database/controllers/reviewController.js";

var apiRouter = express.Router();

/* GET Endpoint di test */
apiRouter.get("/test", function (req, res, next) {
  res.send("TEST OK");
});

function unpackUserForResponse(user) {
  return {
    _id: user._id,
    customerName: user.customerName,
    username: user.username,
    email: user.email,
  };
}

function throwCustomAPIError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

// API per i customer
apiRouter.get("/customers", async function (req, res, next) {
  try {
    if (!req.query.username || !req.query.password) {
      res.status(400).json({
        message:
          "Missing fields in login request. Please insert Username and Password.",
      });
    } else {
      const foundCustomer = await CustomerController.get({
        username: req.query.username,
        password: req.query.password,
      });
      if (foundCustomer.length === 0) {
        res.status(401).json({ message: "Invalid username or password." });
      } else if (foundCustomer.length > 1) {
        throw new Error(
          "Conflict with this username and password. Please contact the customer service.",
        );
      } else {
        res.json(unpackUserForResponse(foundCustomer[0]));
      }
    }
  } catch (error) {
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.post("/customers", async function (req, res, next) {
  try {
    const newCustomer = await CustomerController.add(req.body);
    res.json(unpackUserForResponse(newCustomer));
  } catch (error) {
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

// API per i prodotti

const adaptProductsFilter = function (req) {
  const filters = {};
  if (req.query.productId) {
    filters.productId = req.query.productId;
  }
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.description) {
    filters.description = req.query.description;
  }
};

apiRouter.get("/products", async function (req, res, next) {
  try {
    let page = parseInt(req.query.page || 1);
    if (isNaN(page)) {
      page = 1;
    }
    const foundProducts = await ProductController.getPaged(
      adaptProductsFilter(req),
      page,
    );
    const productsTotalCount = await ProductController.count();
    res.json({ products: foundProducts, productsCount: productsTotalCount });
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.get("/products/:id", async function (req, res, next) {
  try {
    const foundProduct = await ProductController.getById(req.params.id);
    res.json(foundProduct);
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

// API per gli ordini

apiRouter.get("/orders", async function (req, res, next) {
  try {
    const foundOrders = await OrderController.get(req.query);
    res.json({ orders: foundOrders });
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.post("/orders", async function (req, res, next) {
  try {
    const orderData = req.body;
    if (!orderData.status) {
      throwCustomAPIError("Order status missing.", 400);
    }
    if (!orderData.customer) {
      throwCustomAPIError("Customer missing.", 400);
    }
    if (!orderData.orderDate) {
      orderData.orderDate = new Date().toISOString();
    }
    const status = await OrderStatusController.get({
      statusId: orderData.status,
    });
    if (status.length === 0) {
      throwCustomAPIError(
        `Order status ${orderData.status} non existent.`,
        404,
      );
    }
    orderData.status = status[0]._id;
    orderData.products =
      orderData.products && orderData.products.length > 0
        ? orderData.products
        : [];
    const newOrder = await OrderController.add(orderData);
    const responseData = await newOrder.getResponseData();
    res.json(responseData);
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.patch("/orders/:orderId", async function (req, res, next) {
  try {
    const orderData = req.body;
    if (orderData.status) {
      const status = await OrderStatusController.get({
        statusId: orderData.status,
      });
      orderData.status = status[0]?._id || null;
    }
    const updatedOrder = await OrderController.updateById(
      req.params.orderId,
      orderData,
    );
    if (!updatedOrder) {
      throwCustomAPIError("Order not found", 404);
    }
    const responseData = await updatedOrder.getResponseData();
    res.json(responseData);
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

// API per le reviews

apiRouter.post("/reviews", async function (req, res, next) {
  try {
    const newReview = await ReviewController.add(req.body);
    const reviewResponse = await newReview.getResponseData();
    reviewResponse.customer = unpackUserForResponse(reviewResponse.customer);
    res.json(reviewResponse);
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.get("/products/:productId/reviews", async function (req, res, next) {
  try {
    const productReviews = await ReviewController.get({
      product: req.params.productId,
    });
    const defs = [];
    for (const review of productReviews) {
      defs.push(review.getResponseData());
    }
    const reviewsResponse = await Promise.allSettled(defs);

    res.json({
      reviews: reviewsResponse.map((r) => {
        console.warn("reviewsResponse r", r);
        return {
          ...r.value,
          customer: unpackUserForResponse(r.value.customer),
        };
      }),
    });
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

// API customer specifiche

apiRouter.get("/customers/:customerId/orders", async function (req, res, next) {
  try {
    const foundOrders = await OrderController.get({
      customer: req.params.customerId,
    });
    const defs = [];
    for (const order of foundOrders) {
      defs.push(order.getResponseData());
    }
    const ordersResponse = await Promise.allSettled(defs);
    res.json({ orders: ordersResponse.map((or) => or.value) });
  } catch (error) {
    console.error(error);
    const errorDetails = errorHandler(error);
    res.status(errorDetails.statusCode).json({ message: errorDetails.message });
  }
});

apiRouter.get(
  "/customers/:customerId/reviews",
  async function (req, res, next) {
    try {
      const foundReviews = await ReviewController.get(req.params.customerId);
      const defs = [];
      for (const review of foundReviews) {
        defs.push(review.getResponseData());
      }
      const reviewsResponse = await Promise.allSettled(defs);
      res.json({ reviews: reviewsResponse.map((rr) => rr.value) });
    } catch (error) {
      console.error(error);
      const errorDetails = errorHandler(error);
      res
        .status(errorDetails.statusCode)
        .json({ message: errorDetails.message });
    }
  },
);

export default apiRouter;
