import * as actionTypes from "./authActionTypes";

const initialState = {
  isOtpSent: false,
  isOtpVerified: false,
  phone: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_OTP_SENT:
      return {
        ...state,
        isOtpSent: action.payload?.status,
        phone: action.payload?.status,
      };
    case actionTypes.VERIFY_OTP:
      return { ...state, isOtpVerified: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
