import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { ProductsRepository } from "../../repositories/productsRepository";
import { Product, User } from "../../types";
import { useEffect, useState } from "react";
import ToastError from "../alerts/ToastError";
import { useAppSelector } from "../../hooks";
import "./productsShowcase.css";
import { useNavigate } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function ProductsShowcase({ user }: { user: User | undefined | null }) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productRetrievalError, setProductRetrievalError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const currentCart = useAppSelector((state) => state.orders.currentCart);

  const checkProductInCart = function (p: Product) {
    return currentCart.findIndex((ccp) => p._id === ccp._id) >= 0;
  };

  function formatPrice(prezzo: number) {
    return formatter.format(prezzo);
  }

  const fetchProds = async function (page: number) {
    return await ProductsRepository.getProducts(page);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setProductRetrievalError("");
      try {
        const { products, productsCount } = await fetchProds(page);
        setProducts(() => products);
        setTotalPages(Math.ceil(productsCount / 12));
      } catch (err: any) {
        setProductRetrievalError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  return (
    <Container fluid>
      <Row>
        {loading ? (
          <></>
        ) : (
          products.map((p: Product) => {
            return (
              <Col key={p._id} xs={12} sm={3} md={2}>
                <div className="w-100 p-2 prod-card">
                  <img
                    className="w-100 prod-img mb-1"
                    src={`/cdn/racsock${p.imgIndex}`}
                    alt={`/cdn/racsock${p.imgIndex}`}
                  ></img>
                  <div className="d-flex flex-wrap flex-md-row flex-column justify-content-between align-content-center align-items-center">
                    <h6>
                      <b>{p.title}</b>
                    </h6>
                    <h6>
                      <b>{formatPrice(p.unitPrice)}</b>
                    </h6>
                  </div>
                  <div
                    className="w-100 p-1 overflow-y-auto overflow-x-hidden"
                    style={{ height: "100px" }}
                  >
                    <p
                      style={{
                        inlineSize: "100%",
                        writingMode: "horizontal-tb",
                        overflowWrap: "break-word",
                      }}
                    >
                      {p.description}
                    </p>
                  </div>
                  <div className="d-flex flex-column flex-md-row flex-wrap gap-1">
                    <Button
                      className={
                        checkProductInCart(p)
                          ? "bi bi-check w-100"
                          : "bi bi-cart-plus w-100"
                      }
                      variant={
                        checkProductInCart(p) ? "success" : "outline-info"
                      }
                      disabled={checkProductInCart(p)}
                      onClick={() => {
                        navigate(`/product/${p._id}`);
                      }}
                    ></Button>
                  </div>
                </div>
              </Col>
            );
          })
        )}
      </Row>
      <Row>
        <Col>
          <Pagination className="w-100 justify-content-center">
            {Array.from({ length: totalPages }, (v, i) => i + 1).map(
              (n: number) => {
                return (
                  <Pagination.Item
                    key={n}
                    active={page === n}
                    onClick={() => {
                      setPage(n);
                    }}
                  >
                    {n}
                  </Pagination.Item>
                );
              },
            )}
          </Pagination>
        </Col>
      </Row>
      <ToastError
        show={!!productRetrievalError}
        message={productRetrievalError}
        onClose={() => {
          setProductRetrievalError("");
        }}
      ></ToastError>
    </Container>
  );
}

export default ProductsShowcase;
