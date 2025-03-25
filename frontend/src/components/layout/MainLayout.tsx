import { Col, Container, Row } from "react-bootstrap";
import "./mainLayout.css";
import TopBar from "./TopBar";
import { useAppSelector } from "../../hooks";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../hooks";
import { changeLoggedUser } from "../../stores/slices/authSlice";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout({ children }: any) {
  // removeCookie serve
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies<"user">();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (cookies.user) {
      dispatch(changeLoggedUser(cookies.user));
    }
  }, [cookies, dispatch]);

  const onLogoutFunction = function () {
    removeCookie("user");
    dispatch(changeLoggedUser(null));
    navigate("/login");
  };

  return (
    <>
      <TopBar user={auth.user} onLogoutFn={onLogoutFunction}></TopBar>
      <Container fluid className="h-100 px-0 m-0">
        {children ? (
          <Row className="m-0 p-3">
            <Col>{children}</Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="m-0 p-3">
          <Col>
            <Outlet></Outlet>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainLayout;
