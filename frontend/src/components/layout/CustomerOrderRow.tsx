import { Col, Row } from "react-bootstrap";
import { Order } from "../../types";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function CustomerOrderRow({ order }: { order: Order }) {
  return (
    <Row style={{ borderBottom: "1px solid #ffffff38" }}>
      <Col>
        <h6>Date: {new Date(order.orderDate).toLocaleDateString()}</h6>
      </Col>
      <Col>
        <h6>Total Amount: {formatter.format(order.totalAmount)}</h6>
      </Col>
      <Col>
        <h6>Status: {order.status.title}</h6>
      </Col>
    </Row>
  );
}

export default CustomerOrderRow;
