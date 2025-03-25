import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import logo from "../../../raccoonDealerIcon.jpg";
import "./loginForm.css";
import { AuthRepository } from "../../../repositories/auth/authRepository";
import ToastError from "../../alerts/ToastError";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { changeLoggedUser } from "../../../stores/slices/authSlice";
import { useCookies } from "react-cookie";
import { User } from "../../../types";
import { useSearchParams } from "react-router-dom";

declare type signupFields = "customerName" | "username" | "email" | "password";
declare type loginFields = "username" | "password";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [signupError, setSignupError] = useState<string | undefined>(undefined);
  const [cookies, setCookie] = useCookies<"user">();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // signup vars

  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupValid, setSignupValid] = useState<boolean>(false);
  const [invalidSignupFields, setInvalidSignupFields] = useState<Array<string>>(
    [],
  );
  const signupFormRef = useRef<HTMLFormElement>(null);

  const signupFieldNames = {
    customerName: "Name",
    username: "Username",
    email: "Email",
    password: "Password",
  };

  // login vars

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginValid, setLoginValid] = useState<boolean>(false);
  const [invalidLoginFields, setInvalidLoginFields] = useState<Array<string>>(
    [],
  );
  const loginFormRef = useRef<HTMLFormElement>(null);

  const loginFieldsNames = {
    username: "Username",
    password: "Password",
  };

  // reset delle variabili di signup e login all'unmount

  useEffect(() => {
    return () => {
      setSignupName("");
      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");

      setLoginUsername("");
      setLoginPassword("");
    };
  }, []);

  // validatori

  const validateSignupData = function (signupData: {
    [k in signupFields]: string | undefined;
  }) {
    const invalidFields = [] as Array<string>;
    for (const sd in signupData) {
      if (!signupData[sd as keyof typeof signupData]) {
        invalidFields.push(
          signupFieldNames[sd as keyof typeof signupFieldNames],
        );
      }
    }
    return invalidFields;
  };

  const validateLoginData = function (loginData: {
    [k in loginFields]: string | undefined;
  }) {
    const invalidFields = [] as Array<string>;
    for (const sd in loginData) {
      if (!loginData[sd as keyof typeof loginData]) {
        invalidFields.push(
          loginFieldsNames[sd as keyof typeof loginFieldsNames],
        );
      }
    }
    return invalidFields;
  };

  // user setter function

  const setUser = function (user: User) {
    setCookie("user", user, { path: "/" });
    dispatch(changeLoggedUser(user));
  };

  // chiamate

  const doSignup = async function () {
    if (!signupFormRef.current) {
      return;
    }
    const signupData = {
      customerName: signupName,
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    };
    const invalidFields = validateSignupData(signupData);
    setInvalidSignupFields(invalidFields);
    if (invalidFields.length > 0) {
      setSignupValid(false);
      return;
    }
    setSignupValid(true);
    try {
      const loggedNewCustomer = await AuthRepository.doSignup(signupData);
      setUser(loggedNewCustomer);
      setSignupError(undefined);
      navigate(searchParams.get("redirect") || "/");
    } catch (e: any) {
      console.error("Errore signup: ", e);
      setSignupError(e.response?.data?.message || "Errore interno");
    }
  };

  const doLogin = async function () {
    if (!loginFormRef.current) {
      return;
    }
    const loginData = {
      username: loginUsername,
      password: loginPassword,
    };
    const invalidFields = validateLoginData(loginData);
    setInvalidLoginFields(invalidFields);
    if (invalidFields.length > 0) {
      setLoginValid(false);
      return;
    }
    setLoginValid(true);
    try {
      const loggedCustomer = await AuthRepository.doLogin(loginData);
      setUser(loggedCustomer);
      setSignupError(undefined);
      navigate(searchParams.get("redirect") || "/");
    } catch (e: any) {
      console.error("Errore signup: ", e);
      setSignupError(e.response?.data?.message || "Errore interno");
    }
  };

  return (
    <Container fluid className="h-100 py-3">
      <Row>
        <Col
          xs={12}
          className="d-flex flex-column flex-wrap align-content-center align-item-center"
        >
          <h4>Hey! A new customer...</h4>
          <img src={logo} className="login-top-image" alt="loginTopImage"></img>
          <h5 className="py-4">Sorry my memory is a bit foggy lately.</h5>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={6}
          className={width >= 768 ? "border-right py-2" : "border-bottom py-2"}
        >
          <Form
            className="login-form"
            ref={loginFormRef}
            noValidate
            validated={loginValid}
            onSubmit={(e) => {
              e.preventDefault();
              doLogin();
            }}
          >
            <h5>If we have already met, refresh my memory...</h5>
            <Form.Group className="mb-3" controlId="login-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                value={loginUsername}
                isInvalid={invalidLoginFields.includes("Username")}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="login-pswd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={loginPassword}
                isInvalid={invalidLoginFields.includes("Password")}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
        <Col xs={12} sm={12} md={6} className="py-2">
          <Form
            className="signup-form"
            ref={signupFormRef}
            noValidate
            validated={signupValid}
            onSubmit={(e) => {
              e.preventDefault();
              doSignup();
            }}
          >
            <h5>If you are actually new, please get to know each other!</h5>
            <Form.Group className="mb-3" controlId="signup-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={signupEmail}
                isInvalid={invalidSignupFields.includes("Email")}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert an email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-customername">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                value={signupName}
                isInvalid={invalidSignupFields.includes("Name")}
                onChange={(e) => setSignupName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                value={signupUsername}
                isInvalid={invalidSignupFields.includes("Username")}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-pswd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={signupPassword}
                isInvalid={invalidSignupFields.includes("Password")}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please insert a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        </Col>
        <ToastError
          show={!!signupError}
          message={signupError as string}
          onClose={(e?: any) => {
            setSignupError(undefined);
          }}
        ></ToastError>
      </Row>
    </Container>
  );
}

export default LoginForm;
