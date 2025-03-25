import { Button, Col, Container, Row } from "react-bootstrap";
import thankyouRaccoonImg from "../thankyou-raccoon.jpg";
import surprisedRaccoon from "../surprised-raccoon.jpg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentOrder, emptyCart } from "../stores/slices/orderSlice";
import { useEffect } from "react";
import OrderConfirmView from "../components/layout/OrderConfirmView";

function OrderConfirmedThankyouPage() {
  const navigate = useNavigate();
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(emptyCart());
      dispatch(setCurrentOrder(null));
    };
  }, []);
  if (!user) {
    return (
      <Container>
        <Row>
          <Col className="d-flex flex-column flex-wrap align-content-center align-items-center">
            <img
              className="not-found-img"
              src={surprisedRaccoon}
              alt="surprisedRaccoon"
            ></img>
            <h5>You shouldn't be here!!</h5>
            <h5>This is a page for logged users only!</h5>
            <Button
              variant="danger"
              onClick={() => {
                navigate("/");
              }}
            >
              Return to home page
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  if (!currentOrder || currentOrder.status.statusId !== 2) {
    return (
      <Container>
        <Row>
          <Col className="d-flex flex-column flex-wrap align-content-center align-items-center">
            <img
              className="not-found-img"
              src={surprisedRaccoon}
              alt="surprisedRaccoon"
            ></img>
            <h5>You haven't confirmed nothing yet!</h5>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Return to home page
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex flex-column flex-wrap align-content-center align-items-center">
          <img
            className="not-found-img"
            src={thankyouRaccoonImg}
            alt="thankyouRaccoonImg"
          ></img>
          <h5>Thank you very much sir for your order confirmation.</h5>
          <h5>We appriciate that you enjoyed some of our products.</h5>
          <h6>Here following is the order you just confirmed:</h6>
          <div className="w-50 w-xs-100">
            <OrderConfirmView
              order={currentOrder}
              user={user}
            ></OrderConfirmView>
          </div>
          <Button
            variant="success"
            onClick={() => {
              navigate("/");
            }}
          >
            Return to home page
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderConfirmedThankyouPage;
