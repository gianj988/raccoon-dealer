import { Col, Container, Row } from "react-bootstrap";
import { Order } from "../types";
import { useEffect, useState } from "react";
import ToastError from "../components/alerts/ToastError";
import CustomerOrderRow from "../components/layout/CustomerOrderRow";
import { OrderRepository } from "../repositories/orderRepository";
import { useAppSelector } from "../hooks";

function CustomerOrdersPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ordersRetrievalError, setOrdersRetrievalError] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const fetchOrders = async function () {
      if (!user) {
        return;
      }
      setLoading(() => true);
      try {
        const customerOrders = await OrderRepository.getCustomerOrders(
          user?._id as string,
        );
        setOrders(() => customerOrders.orders);
      } catch (e: any) {
        setOrdersRetrievalError(e.response?.data?.message || e.message);
      } finally {
        setLoading(() => false);
      }
    };
    fetchOrders();
    return () => {
      setOrders(() => []);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="w-100">
        <h6>
          You are not logged in. I have to know who you are to retrieve your
          orders.
        </h6>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h6>Your orders:</h6>
        </Col>
      </Row>
      {loading ? (
        <p>Loading customer orders...</p>
      ) : (
        orders.map((o: Order) => (
          <CustomerOrderRow order={o}></CustomerOrderRow>
        ))
      )}
      <ToastError
        show={!!ordersRetrievalError}
        message={ordersRetrievalError as string}
        onClose={() => {
          setOrdersRetrievalError(undefined);
        }}
      ></ToastError>
    </Container>
  );
}

export default CustomerOrdersPage;
