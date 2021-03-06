import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/userAction";
import { Redirect } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const responseGoogle = (response) => {
    console.log(response);
    if (response.error) {
      console.error(response.error);
    }
    setUser({ ...response.profileObj, ...response.tokenObj });
  };
  if (user) return <Redirect to="/" />;
  return (
    <GoogleLogin
      clientId="619347325499-jjlo4ois194n923cihu1bbcspqfl4v0s.apps.googleusercontent.com"
      buttonText="Login"
      isSignedIn={true}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};
export default connect(mapStateToProps, { setUser })(Login);
