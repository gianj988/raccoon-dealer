import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import OrderConfirmView from "../components/layout/OrderConfirmView";
import { useState } from "react";
import { OrderRepository } from "../repositories/orderRepository";
import ToastError from "../components/alerts/ToastError";
import ToastInfo from "../components/alerts/ToastInfo";
import { emptyCart, setCurrentOrder } from "../stores/slices/orderSlice";
import { Order } from "../types";

function OrderConfirmPage() {
  const auth = useAppSelector((state) => state.auth);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const currentCart = useAppSelector((state) => state.orders.currentCart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [confirmError, setConfirmError] = useState<string | undefined>(
    undefined,
  );
  const [confirmInfo, setConfirmInfo] = useState<string | undefined>(undefined);

  const confirmOrder = async function (o: Order) {
    try {
      const orderConfirmed = await OrderRepository.confirmOrder(o._id);
      dispatch(emptyCart());
      dispatch(setCurrentOrder(orderConfirmed));
      setConfirmInfo("Huzzah! Order confirmed!");
      setTimeout(() => {
        setConfirmInfo(undefined);
        navigate("/thank-you");
      }, 2000);
    } catch (e: any) {
      setConfirmError(e.response?.data?.message || e.message);
    }
  };

  if (!auth.user) {
    return (
      <>
        <h6>
          It seems that you entered an area for logged users only. Please login.
        </h6>
        <Button
          variant="info"
          onClick={() => {
            navigate("/login?redirect=/order-confirm");
          }}
        >
          To Login
        </Button>
      </>
    );
  }
  if (!currentOrder) {
    if (currentCart.length > 0) {
      return (
        <>
          <h6>
            It seems you are in a hurry. You came here before reviewing your
            cart.
          </h6>
          <h6>Please review your cart before confirming the order!</h6>
          <Button
            variant="info"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Review Cart
          </Button>
        </>
      );
    }
    return (
      <>
        <h6>
          Hi! It appears that you don't have nothing confirm yet. Please buy
          something first!
        </h6>
        <Button
          variant="info"
          onClick={() => {
            navigate("/");
          }}
        >
          To Our Raccoonish Store
        </Button>
      </>
    );
  }

  return (
    <>
      <h6>Hi, here are your order's data</h6>
      <OrderConfirmView
        user={auth.user}
        order={currentOrder}
      ></OrderConfirmView>
      <Button
        variant="success"
        onClick={() => {
          confirmOrder(currentOrder);
        }}
      >
        Click here to confirm the order
      </Button>
      <ToastError
        show={!!confirmError}
        message={confirmError as string}
        onClose={() => {
          setConfirmError(undefined);
        }}
      ></ToastError>
      <ToastInfo
        show={!!confirmInfo}
        message={confirmInfo as string}
        onClose={() => {
          setConfirmInfo(undefined);
        }}
      ></ToastInfo>
    </>
  );
}

export default OrderConfirmPage;
