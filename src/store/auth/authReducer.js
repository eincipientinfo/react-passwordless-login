import * as actionTypes from "./authActionTypes";

const initialState = {
  isOtpSent: false,
  isOtpVerified: false,
  phone: "",
  msg: "",
  authData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_OTP_SENT:
      return {
        ...state,
        isOtpSent: action.payload?.status,
        msg: action.payload?.msg,
      };
    case actionTypes.VERIFY_OTP:
      return {
        ...state,
        isOtpVerified: action.payload?.status,
        msg: action.payload?.msg,
        authData: action.payload?.data,
      };
    default:
      return { ...state };
  }
};

export default reducer;
