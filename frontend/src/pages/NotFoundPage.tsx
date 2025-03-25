import { Container, Row, Col } from "react-bootstrap";
import NotFoundImg from "../raccoonDidNotFoundAnything.jpg";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container fluid>
      <Row>
        <Col className="d-flex flex-column flex-wrap align-content-center align-items-center">
          <img
            className="not-found-img"
            src={NotFoundImg}
            alt="notFoundImage"
          ></img>
          <h5>Raccoon didn't found what you were looking for.</h5>
          <Link to={{ pathname: "/" }}>
            Click here. I'll take you back to home, sir.
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;
