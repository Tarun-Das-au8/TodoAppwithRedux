import { connect } from 'react-redux';
import BlogPosts from './component/BlogPosts';
import Login from './component/Login';
import { GoogleLogout } from "react-google-login";
import { logOutUser } from "./redux/actions/userAction";



function App({user, logOutUser}) {

  const handleLogoutFailure = (err) => {
    console.error(err);
  };

  const handleLogoutSuccess = () => {
    logOutUser();
    alert("Logged Out");
  };

  return (
    <div className="App">
      {!user ?
      <Login/> :  <GoogleLogout
      clientId='619347325499-jjlo4ois194n923cihu1bbcspqfl4v0s.apps.googleusercontent.com'
      buttonText="Logout"
      onLogoutSuccess={handleLogoutSuccess}
      onFailure={handleLogoutFailure}
    />}
      <BlogPosts/>
    </div>
  );
}

const mapStateToProps = (state) => {
  
  return {
    user: state.userState.user
  }
}

export default connect(mapStateToProps, { logOutUser })(App);
