import * as actionTypes from "./authActionTypes";
import { apibaseUrl, CLIENT_ID, CLIENT_SECRET_TOKEN } from "../../api/api";
import axios from "axios";

const data = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET_TOKEN,
  phone_number: "",
  connection: "sms",
  send: "code",
  authParams: {
    scope: "openid",
    state: "YOUR_STATE",
  },
};

const headers = {
  "content-type": "application/json",
};

export const login = (phone) => {
  return (dispatch) =>
    axios
      .post(
        `${apibaseUrl}/passwordless/start`,
        {
          ...data,
          phone_number: phone,
        },
        headers
      )
      .then((res) => {
        console.log(res, "res");
        dispatch({
          type: actionTypes.IS_OTP_SENT,
          payload: { status: true, phone: phone },
        });
      })
      .catch((error) => {
        console.log(error, "res");
        dispatch({
          type: actionTypes.IS_OTP_SENT,
          payload: { status: true, phone: phone },
        });
      });
};

const otpData = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET_TOKEN,
  grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
  connection: "sms",
  otp: "",
  realm: "sms",
};

export const verifyOtp = ({ otp, phone }) => {
  console.log(otp, phone, "action");
  return (dispatch) =>
    axios
      .post(
        `${apibaseUrl}/oauth/token`,
        {
          ...otpData,
          otp: otp,
          username: phone,
        },
        headers
      )
      .then((res) => {
        dispatch({ type: actionTypes.VERIFY_OTP, payload: res });
      })
      .catch((error) => {
        console.log(error, "err");
      });
};
