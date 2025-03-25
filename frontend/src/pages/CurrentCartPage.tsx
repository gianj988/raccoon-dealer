import { Button, Col, Container, Row } from "react-bootstrap";
import CartLine from "../components/layout/CartLine";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentOrder } from "../stores/slices/orderSlice";
import { useState } from "react";
import ToastInfo from "../components/alerts/ToastInfo";
import ToastError from "../components/alerts/ToastError";
import { OrderRepository } from "../repositories/orderRepository";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../stores/slices/orderSlice";
import { Product } from "../types";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function CurrentCartPage() {
  const currentCart = useAppSelector((state) => state.orders.currentCart);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orderError, setOrderError] = useState<string | undefined>();
  const [cartInfo, setCartInfo] = useState<string | undefined>();

  const goCheckout = async function () {
    if (auth.user) {
      try {
        const orderCreated = await OrderRepository.createOrder(
          auth.user._id,
          currentCart,
        );
        dispatch(setCurrentOrder(orderCreated));
        navigate("/order-confirm");
      } catch (e: any) {
        console.error(e);
        setOrderError(e.response?.data?.message || e.message);
      }
    }
  };

  const cartLines = currentCart.map((p) => (
    <CartLine
      product={p}
      onRemoveFn={(p) => {
        dispatch(removeFromCart(p));
      }}
    ></CartLine>
  ));

  const calculateTotalAmount = function (currentCart: Array<Product>) {
    let totalAmount = 0;
    for (const p of currentCart) {
      totalAmount += p.unitPrice;
    }
    return totalAmount;
  };

  return (
    <>
      {currentCart.length > 0 ? (
        cartLines
      ) : (
        <h6>
          <b>Your cart is empty...</b>
        </h6>
      )}
      <Container fluid className="py-3">
        <Row>
          <Col xs={12} sm={6}>
            <h6>
              Total amount:{" "}
              {formatter.format(calculateTotalAmount(currentCart))}
            </h6>
          </Col>
          <Col
            xs={12}
            sm={6}
            className="d-flex flex-wrap flex-row justify-content-start justify-content-sm-end"
          >
            {currentCart.length === 0 ? (
              <div>
                <h6>Nothing inside the cart. Raccoon sad.</h6>
                <Button
                  variant="info"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Click here to return to Home
                </Button>
              </div>
            ) : (
              <Button
                variant="success"
                className="w-xs-100"
                onClick={goCheckout}
                disabled={!auth.user}
              >
                {auth.user
                  ? "Go to checkout"
                  : "Login required to access checkout"}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <ToastInfo
        show={!!cartInfo}
        message={cartInfo as string}
        onClose={() => {
          setCartInfo(undefined);
        }}
      ></ToastInfo>
      <ToastError
        show={!!orderError}
        message={orderError as string}
        onClose={() => {
          setOrderError(undefined);
        }}
      ></ToastError>
    </>
  );
}

export default CurrentCartPage;
