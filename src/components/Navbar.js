import React from "react";
import { Box, Image, Button } from "gestalt";
import { calculateTotalItems, getToken, clearToken, clearCart, getCart } from "../utils";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
// import SearchItems from "./SearchItems";



class Navbar extends React.Component {
  state = {   
    cartItems: [] 
  }

  
    handleSignout = () => {
        clearToken();
        clearCart();
        this.props.history.push("/");
        
    };
    componentDidMount() {
      console.log(this.props)    
      this.setState({ cartItems: getCart()}) 
         
    }
    render() {
        const {cartItems} = this.state
        return getToken() !== null ? 
        <AuthNav handleSignout={this.handleSignout} cartItems={cartItems}/> : <UnAuthNav />;        
    }
};


const AuthNav = ({ handleSignout, cartItems }) => (
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
      <Box marginTop={12} margin={2} height={90} width={180}>
          <Image
            alt="FeMMit Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo-in.png"
          />
        </Box>        
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
        <p>{calculateTotalItems(cartItems)}<i className="fa fa-shopping-cart">{" "} Checkout </i> </p>
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
        <Box marginTop={12} margin={2} height={90} width={180}>
          <Image
            alt="FeMMit Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.png"
          />
        </Box>           
      </Box>
    </NavLink>
    
    {/* Sign In Link*/}
    <NavLink activeClassName="active" to="/signin">
        <div className="signin-spacing">
        <i className="fa fa-sign-in" aria-hidden="true" title="Sign In"></i>
            
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
