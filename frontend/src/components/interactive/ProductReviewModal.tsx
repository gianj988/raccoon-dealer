import { useRef, useState } from "react";
import { Product } from "../../types";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

function ProductReviewModal({
  product,
  onCloseFn,
  onSaveFn,
  show,
  props,
}: {
  product: Product;
  onCloseFn: () => void;
  onSaveFn: (r: number, c: string) => void;
  show: boolean;
  props: any;
}) {
  const [rating, setRating] = useState<number>(1);
  const [reviewComment, setReviewComment] = useState<string | undefined>();
  const [formValidated, setFormValidated] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);

  const closeFn = () => {
    setRating(1);
    setReviewComment(undefined);
    onCloseFn();
  };

  const _saveFn = function (r: number, c: string) {
    setRating(1);
    setReviewComment(undefined);
    onSaveFn(r, c);
  };

  const saveCheck = function (r: number, c: string | undefined) {
    let formValid = false;
    if (formRef.current) {
      formValid = formRef.current.checkValidity() && !!c?.trim();
      setFormValidated(formValid);
    }
    if (formValid) {
      _saveFn(r, c as string);
    }
  };

  return (
    <Modal
      {...props}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Review for product: {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <div style={{ height: "90px" }}>
                <img
                  className="h-100"
                  style={{
                    borderRadius: "5px",
                    aspectRatio: 1,
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  alt={`racsock${product.imgIndex}`}
                  src={`/cdn/racsock${product.imgIndex}`}
                ></img>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form
                noValidate
                ref={formRef}
                validated={!!(!!reviewComment?.trim() && formValidated)}
              >
                <Form.Group>
                  <Form.Label for="rating-select">
                    What's your rating for this product?
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setRating(parseInt(e.target.value));
                    }}
                    id="rating-select"
                    value={rating}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="comment-area">
                  <Form.Label>
                    What's your thoughts about this product?
                  </Form.Label>
                  <Form.Control
                    value={reviewComment}
                    onChange={(e) => {
                      setReviewComment(e.target.value);
                    }}
                    style={{ resize: "none" }}
                    isInvalid={!formValidated}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeFn}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            saveCheck(rating, reviewComment as string);
          }}
        >
          Save review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductReviewModal;
