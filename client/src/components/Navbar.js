import React from "react";
import { Box, Image, Button } from "gestalt";
import { getToken, clearToken, clearCart } from "../utils";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";

const divStyle = {
  fontSize: '20px',
  fontFamily: 'bodoni',
  fontWeight: 'bold',
  color: 'black',
  
};

const divInStyle = {
  fontSize: '20px',
  fontFamily: 'bodoni',
  fontWeight: 'bold',
  color: 'white',
  
};

class Navbar extends React.Component {
    handleSignout = () => {
        clearToken();
        clearCart();
        this.props.history.push("/");
    };

    render() {
        return getToken() !== null ? 
        <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />;        
    }
};

const AuthNav = ({ handleSignout }) => (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={50}
    color="blue"
    padding={1}
    // shape="roundedBottom"
    borderRadius={32}
  >
    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box marginTop={6} margin={2} height={60} width={70}>
          <Image
            alt="FeMMit Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.jpg"
          />
        </Box>
        <div style={divInStyle}>
          FeMMit
        </div>
      </Box>
    </NavLink>

    
    {/* Signout Button */}
    <div className="signout-spacing">
      <Button
        onClick={handleSignout}
        color="transparent"
        text="Sign Out"
        inline
        size="md"
      />
    </div>
    {/* Checkout Link */}
    <NavLink activeClassName="active" to="/checkout">
      <div className="checkout-spacing">
        <i className="fa fa-shopping-cart"> </i> 
      </div>
    </NavLink>    

    
  </Box>
); 

const UnAuthNav = () => (
    <Box
      display="flex" 
      alignItems="center"
      justifyContent="around"
      height={60} 
      color="gray" 
      padding={1} 
      shape="roundedBottom"
            
    >
        {/* Title and logo*/}
        <NavLink activeClassName="active" exact to="/">
          <Box display="flex" alignItems="center">
            <Box marginTop={6} margin={2} height={60} width={70}>
              <Image
                alt="FeMMit Logo"
                naturalHeight={1}
                naturalWidth={1}
                src="./icons/logo.jpg"
              />
            </Box>
            {/* Title */}
            <div className="logoname">                
              <span>FeMMit</span>              
            </div>
          </Box>
        </NavLink>
        {/* Sign In Link*/}
        <NavLink activeClassName="active" to="/signin">
            <div className="signin-spacing">
            <i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i>
                
            </div>
        </NavLink>

        {/* Sign Up Link*/}
        <NavLink activeClassName="active" to="/signup">
            <div className="signup-spacing">
                <span>Get Started</span>
            </div>
        </NavLink>
    </Box>    
);

export default withRouter(Navbar);
