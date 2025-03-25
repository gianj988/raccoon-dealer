import { AuthAdapter } from "../../adapters/authAdapter";

declare interface SignupData {
  customerName: string;
  email: string;
  password: string;
  username: string;
}

declare interface LoginData {
  username: string;
  password: string;
}

const AuthRepository = {
  doSignup: async function (newCustomerData: SignupData) {
    return await AuthAdapter.post("/customers", newCustomerData);
  },
  doLogin: async function (loginData: LoginData) {
    return await AuthAdapter.get("/customers", loginData);
  },
};

export { AuthRepository };
