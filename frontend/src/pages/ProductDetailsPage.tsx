import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Review } from "../types";
import { addToCart } from "../stores/slices/orderSlice";
import { ProductsRepository } from "../repositories/productsRepository";
import ToastError from "../components/alerts/ToastError";
import ProductReviewModal from "../components/interactive/ProductReviewModal";
import { ReviewRepository } from "../repositories/reviewRepository";
import ProductReviewsList from "../components/layout/ProductReviewsList";
import ToastInfo from "../components/alerts/ToastInfo";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function ProductDetailsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.auth.user);
  const currentCart = useAppSelector((state) => state.orders.currentCart);
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [toastErrorMsg, setToastErrorMsg] = useState<string | undefined>();
  const [productReviews, setProductReviews] = useState<Array<Review>>([]);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState<boolean>(false);

  const checkProductInCart = function (p: Product) {
    return currentCart.findIndex((ccp) => p._id === ccp._id) >= 0;
  };

  const addProduct = function (p: Product) {
    dispatch(addToCart(p));
  };

  useEffect(() => {
    const fetchProductInfo = async function () {
      if (!routeParams.productId) {
        return;
      }
      setLoading(() => true);
      try {
        const productInfo = await ProductsRepository.getProductInfo(
          routeParams.productId,
        );
        const productReviews = await ReviewRepository.getProductReviews(
          productInfo._id,
        );
        setProduct(() => productInfo);
        setProductReviews(() => productReviews.reviews);
        setToastErrorMsg(() => undefined);
      } catch (e: any) {
        setToastErrorMsg(e.response?.data?.message || e.message);
      } finally {
        setLoading(() => false);
      }
    };
    fetchProductInfo();
    return () => {
      setProduct(() => undefined);
      setToastErrorMsg(() => undefined);
    };
  }, [routeParams.productId]);

  const postReview = async function (rating: number, comment: string) {
    if (!user) {
      return;
    }
    try {
      const newReview = await ReviewRepository.addCustomerReview({
        customer: user._id,
        product: product?._id as string,
        rating: rating,
        comment: comment,
        date: new Date().toISOString(),
      });
      setProductReviews(productReviews.concat([newReview]));
      setTimeout(() => {
        setShowReviewSuccess(false);
      }, 3500);
    } catch (e: any) {
      setToastErrorMsg(e.response?.data?.message || e.message);
    }
  };

  if (!routeParams.productId) {
    return <p>No product id to fetch.</p>;
  }
  if (!product) {
    return <p>No product for which show information</p>;
  }
  return (
    <Container fluid>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row>
            <Col className="py-2">
              <Button
                variant="outline-primary"
                className="bi bi-arrow-return-left"
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="ms-1">Return to products</span>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <img
                className="product-detail-img"
                alt={`racsock${product.imgIndex}`}
                src={`/cdn/racsock${product.imgIndex}`}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>{product.title}</h4>
              <h6>Price: {formatter.format(product.unitPrice)}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="py-3">
              <h5>Detailed Description:</h5>
              <p
                style={{
                  inlineSize: "100%",
                  writingMode: "horizontal-tb",
                  overflowWrap: "break-word",
                }}
              >
                {product.description}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonGroup>
                <Button
                  className={
                    checkProductInCart(product)
                      ? "bi bi-cart-check"
                      : "bi bi-cart-plus"
                  }
                  variant={checkProductInCart(product) ? "success" : "info"}
                  disabled={checkProductInCart(product)}
                  onClick={() => {
                    addProduct(product);
                  }}
                >
                  <span className="ms-1">Buy</span>
                </Button>
                {user ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setReviewModal(true);
                    }}
                    className="bi bi-pencil-square"
                  >
                    <span className="ms-1">Write Review</span>
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProductReviewsList
                userId={user?._id}
                reviews={productReviews}
              ></ProductReviewsList>
            </Col>
          </Row>
          <ToastError
            show={!!toastErrorMsg}
            message={toastErrorMsg as string}
            onClose={() => {
              setToastErrorMsg(undefined);
            }}
          ></ToastError>
          <ToastInfo
            show={!!showReviewSuccess}
            message={"Your review has been saved! Thank you for your feedback!"}
            onClose={() => {
              setShowReviewSuccess(false);
            }}
          ></ToastInfo>
          <ProductReviewModal
            product={product}
            show={reviewModal}
            onSaveFn={(r: number, c: string) => {
              console.warn("Save review", r, c);
              postReview(r, c);
            }}
            onCloseFn={() => {
              setReviewModal(false);
            }}
            props={{}}
          ></ProductReviewModal>
        </>
      )}
    </Container>
  );
}

export default ProductDetailsPage;
