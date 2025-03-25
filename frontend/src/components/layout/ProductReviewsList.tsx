import { Badge, Col, Container, Row } from "react-bootstrap";
import { Review } from "../../types";

function ProductReviewsList({
  userId,
  reviews,
}: {
  userId?: string;
  reviews: Array<Review>;
}) {
  if (reviews.length === 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h5 className="w-100" style={{ textAlign: "center" }}>
              No reviews for this product yet
            </h5>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="w-100" style={{ textAlign: "center" }}>
            Reviews:
          </h3>
        </Col>
      </Row>
      {reviews.map((r) => (
        <>
          <Row>
            <Col className="py-2">
              <h5>
                Review from: {r.customer.customerName}{" "}
                {r.customer._id === userId ? (
                  <Badge className="ms-1" bg="primary">
                    Hey, it's you!
                  </Badge>
                ) : (
                  <></>
                )}
              </h5>
              <div></div>

              <h5>
                Rating: {r.rating}{" "}
                {r.rating > 3 ? (
                  <Badge className="ms-1" bg="success">
                    <i className="bi bi-emoji-laughing-fill"></i>
                  </Badge>
                ) : (
                  <Badge className="ms-1" bg="danger">
                    <i className="bi bi-emoji-frown-fill"></i>
                  </Badge>
                )}
              </h5>
            </Col>
          </Row>
          <Row style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.47)" }}>
            <Col>
              <h5>Comment:</h5>
              <p>{r.comment}</p>
            </Col>
          </Row>
        </>
      ))}
    </Container>
  );
}

export default ProductReviewsList;
