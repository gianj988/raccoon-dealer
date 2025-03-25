import { Link, useNavigate } from "react-router-dom";
import logo from "../../raccoonDealerIcon.jpg";
import {
  Button,
  Dropdown,
  ButtonGroup,
  Overlay,
  Popover,
} from "react-bootstrap";
import { User } from "../../types";
import { useAppSelector } from "../../hooks";
import { useEffect, useRef, useState } from "react";

declare interface TopBarProps {
  user: User | undefined | null;
  onLogoutFn: () => void;
}

function TopBar({ user, onLogoutFn }: TopBarProps) {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.orders.currentCart);
  const [showCartPopover, setShowCartPopover] = useState<boolean>(false);
  const userAreaRef = useRef(null);
  const cartBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (cartBtnRef.current) {
      if (!user) {
        cartBtnRef.current.classList.remove("popover-shown");
      }
    }
  }, [user]);

  useEffect(() => {
    function triggerPopover() {
      if (!cartBtnRef.current) {
        return;
      }
      if (cartBtnRef.current.classList.contains("popover-shown")) {
        return;
      }
      if (cart.length > 0) {
        cartBtnRef.current.classList.add("popover-shown");
        setShowCartPopover(() => true);
        setTimeout(() => {
          setShowCartPopover(() => false);
        }, 8000);
      } else if (cart.length === 0) {
        setShowCartPopover(() => false);
        cartBtnRef.current.classList.remove("popover-shown");
      }
    }
    triggerPopover();
  }, [cart]);

  return (
    <header className="main-layout-header d-flex flex-wrap flex-row justify-content-between p-2">
      <div className="d-flex h-100 flex-wrap flex-row justify-content-between align-content-center">
        <Link to={"/"} className="d-flex h-100">
          <img className="app-logo" src={logo} alt="topBarIcon"></img>
          <h5 className="d-none d-sm-block lh-base mx-2 my-0">RaccoonDealer</h5>
        </Link>
      </div>
      <div
        ref={userAreaRef}
        style={{ position: "relative" }}
        className="user-area h-100"
      >
        <Button
          className="bi bi-minecart-loaded mx-1"
          ref={cartBtnRef}
          variant="dark"
          onClick={() => {
            navigate(user ? "/cart" : "/login?redirect=/cart");
          }}
        >
          <span className="m-0 ms-1 topbar-cart-quantity">{cart.length}</span>
        </Button>
        <Overlay
          show={showCartPopover}
          target={cartBtnRef}
          placement="bottom"
          container={userAreaRef}
        >
          <Popover id="cart-info">
            <Popover.Header as="h3">Yay you put something!</Popover.Header>
            <Popover.Body>
              <strong>
                Click here to modify your cart content and to finalize your
                order!
              </strong>
            </Popover.Body>
          </Popover>
        </Overlay>
        {user ? (
          <Dropdown as={ButtonGroup}>
            <Button variant="success">Hi, {user.customerName}</Button>

            <Dropdown.Toggle split variant="success" id="user-dropdown" />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/customer/orders");
                }}
              >
                Your orders
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogoutFn}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant="outline-primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
export default TopBar;
