import api from "config/api";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (user, dispatch) => {
  dispatch(loginStart);
  try {
    const res = await api.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
