import { Col, Container, Row } from "react-bootstrap";
import { Order, User } from "../../types";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function OrderConfirmView({ order, user }: { order: Order; user: User }) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h6>
            Customer: <b>{user.customerName}</b>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Status: <b>{order.status.title}</b>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Order date: <b>{new Date(order.orderDate).toLocaleDateString()}</b>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            Total amount: <b>{formatter.format(order.totalAmount)}</b>
          </h6>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderConfirmView;
