import { Button } from "react-bootstrap";
import { Product } from "../../types";
import "./cartLine.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function CartLine({
  product,
  onRemoveFn,
}: {
  product: Product;
  onRemoveFn: (p: Product) => void;
}) {
  const formatPrice = function (price: number) {
    return formatter.format(price);
  };

  return (
    <div className="w-100 py-1 cart-line d-flex flex-wrap flex-column flex-sm-row flex-md-row justify-content-between align-content-center align-items-center">
      <div className="h-100">
        <img
          className="h-100"
          src={`/cdn/racsock${product.imgIndex}`}
          alt={`racsock${product.imgIndex}`}
        ></img>
      </div>
      <h6>{product.title}</h6>
      <h6>{formatPrice(product.unitPrice)}</h6>
      <Button
        variant="danger"
        onClick={() => {
          onRemoveFn(product);
        }}
      >
        Remove from cart
      </Button>
    </div>
  );
}

export default CartLine;
