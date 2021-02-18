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
        dispatch({
          type: actionTypes.IS_OTP_SENT,
          payload: { status: true, phone: phone, msg: "", data: res?.data },
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.IS_OTP_SENT,
          payload: {
            status: false,
            msg: "Not a registered or valid phone number!",
          },
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
        dispatch({
          type: actionTypes.VERIFY_OTP,
          payload: { status: true, data: res?.data, msg: "" },
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.VERIFY_OTP,
          payload: { status: false, msg: "Not a valid OTP" },
        });
      });
};
