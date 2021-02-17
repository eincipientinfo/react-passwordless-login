import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login, verifyOtp } from "../../../store/auth/authActions";
import { object, func, bool } from "prop-types";
const styles = {
  root: {},
  container: {},
  loginSection: {
    padding: "0px 24px",
    boxSizing: "bordered-box",
    marginTop: 120,
    height: 480,
    width: 360,
    border: "1px solid rgba(0, 0, 0, 0.32)",
  },
  title: {},
  desc: {
    fontWeight: 300,
    color: "rgba(0, 0, 0, 0.32)",
  },
};

const Login = ({ classes, loginUser, isotpSent, verify }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const submitPhoneHandler = (e) => {
    loginUser(phone);
  };

  const verifyOtpHandler = () => {
    verify({ otp, phone });
  };

  useEffect(() => {
    if (otp?.length >= 6) {
      setOtp("");
      verifyOtpHandler();
    }
  }, [otp]);

  return (
    <Grid className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item sm={7}></Grid>
        <Grid item sm={4}>
          <Grid className={classes.loginSection}>
            <h4>Welcome</h4>
            <Divider />
            <h4 className={classes.desc}>Welcome to digital front door!</h4>
            {!isotpSent ? (
              <h4 className={classes.desc}>
                Where we will help your doctor out by providing necessary
                information to have successfull visit
              </h4>
            ) : (
              <h4 className={classes.desc}>
                Please enter your one time password to proceed with registration
                process.
              </h4>
            )}

            {!isotpSent ? (
              <LoginForm
                value={phone}
                inputHandler={setPhone}
                button="Submit"
                name="phone"
                placeholder="Phone Number or Email"
                submithandler={submitPhoneHandler}
              />
            ) : (
              <LoginForm
                value={otp}
                inputHandler={setOtp}
                placeholder="Enter OTP"
                button={null}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  classes: object.isRequired,
  loginUser: func.isRequired,
  isotpSent: bool.isRequired,
  verify: func.isRequired,
};

const mapStateToProps = (state) => ({
  isotpSent: state.auth?.isOtpSent,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data) => dispatch(login(data)),
  verify: (data) => dispatch(verifyOtp(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
