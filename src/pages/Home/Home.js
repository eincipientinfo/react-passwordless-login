import React from "react";
import { connect } from "react-redux";
import Login from "../Auth/Login/Login";
import { object } from "prop-types";

const Home = ({ isOtpVerified }) => {
  return <>{isOtpVerified ? <h1>Welcome to Dashboard</h1> : <Login />}</>;
};

Home.propTypes = {
  classes: object.isRequired,
};

const mapStateToProps = (state) => ({
  isOtpVerified: state.auth?.isOtpVerified,
});

export default connect(mapStateToProps)(Home);
