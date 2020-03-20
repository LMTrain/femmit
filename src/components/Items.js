import React from 'react';
import './Items.css';
import SeeDeptItems from './SeeDeptItems';
import SeeCartItems from './SeeCartItems';
import { Link } from 'react-router-dom';
import { Box, Button, Column, Text } from 'gestalt';
import { calculateTotalItems, setCart, getCart} from '../utils';
// import Navbar from '../components/Navbar';
// import DeptMenu from './DeptMenu';



class Items extends React.Component {
  state = {
      items: [],
      department: '',
      cartItems: [],
      itemDeptId: '',
      itemsSearched: [],
      cartItemsLength: 0,
      displayingCart: false,
      displayBooks: true
      
  }

  displayingCartItems = () => {    
    this.setState({displayingCart: false })      
  };
  
  addToCart = item => {
    const alreadyInCartToDel = this.state.cartItems.find(allItems => allItems._id === item._id);
    console.log("THIS IS ALREADY IN CART", alreadyInCartToDel);
    const alreadyInCart = this.state.cartItems.findIndex(iitem => iitem._id === item._id);
      if (alreadyInCart === -1) {
          const updatedItems = this.state.cartItems.concat({
          ...item,
          quantity: 1
          });
          this.setState({cartItems: updatedItems }, () => setCart(updatedItems));         
      } else {
          const updatedItems = [...this.state.cartItems];
          updatedItems[alreadyInCart].quantity += 1;
          this.setState({cartItems: updatedItems, cartItemsLength: this.state.cartItems.length },() => setCart(updatedItems));        
      }
  };

  deleteItemsFromCart = itemToDeleteId => {
    const filteredItems = this.state.cartItems.filter(
        iitem => iitem._id !== itemToDeleteId
    );
    this.setState({ cartItems: filteredItems, displayingCart: false }, () => setCart(filteredItems));
};

  

  componentDidMount() {    
    this.setState({displayingCart: true,  cartItems: getCart()}) 
    this.changeDeptIdState()     
  }

  changeDeptIdState = () => { 
    // console.log("THIS IS PROPS FROM ITEMS.JS", this.props)   
    this.setState({itemDeptId: this.props.match.params.departmentId})
    
  }
  
  render() {
    const { displayingCart, itemDeptId, itemsSearched, cartItems } = this.state

    return (
      <>
        { displayingCart === true ? <DeptMenu cartItems={cartItems} displayingCartItems={this.displayingCartItems}/> : []}
          <div>
            {/* <Navbar itemDeptId={itemDeptId}/>        */}
            {displayingCart ? <SeeDeptItems itemDeptId={itemDeptId} displayingCartItems={this.displayingCartItems}  addToCart={this.addToCart} itemsSearched={itemsSearched}
            />  : <SeeCartItems deleteItemsFromCart={this.deleteItemsFromCart}/>}          
          </div>
      </>
    );      
  }
}; 
const DeptMenu = ({cartItems, displayingCartItems}) => (
  
    <Box display="flex" direction="row" marginLeft={10}>
    <Column span={2}>
      <Box>
        <Text color="white"></Text>
      </Box>
    </Column>
              
    <div className="lineitems">
      <Link to="5dcf94e2dc3bcd3de0016978"> 
          <div >
              <p>Automotive</p>
          </div>
      </Link>
    </div>       
    <div className="lineitems">
      <Link to="5dcf9519dc3bcd3de001697b">
          <div >                        
              <p>Books</p> 
          </div>                     
      </Link>
    </div>
    <div className="lineitems">
      <Link to="5dcf94a0dc3bcd3de0016975">
          <div>                      
              <p>Electronics</p>
          </div>
      </Link>
    </div>
    <div className="lineitems">
      <Link to="5dcf9457dc3bcd3de0016972">
          <div >                     
              <p>Fashion</p>
          </div>                        
      </Link>
    </div>
    <div className="lineitems">
      <Link to="5dcf8d67dc3bcd3de001696f">  
          <div >                        
              <p>Home</p>                      
          </div>
      </Link>
    </div>
    <div className="lineitems">
      <Link to="5dcf9551dc3bcd3de001697e">
          <div>                     
              <p>Sports Outdoor</p>{" "}
          </div>                        
      </Link>
    </div>           
    <div className="lineitems">
      <Box marginLeft={1} marginRightt={-1} marginTop={3} paddingLeft={0} paddingRight={0}>
        {/* User Cart Heading */}
        <Button size="sm" onClick={displayingCartItems}
            color="blue" text="View Cart"
        />
      </Box>
        <p>{" "}{calculateTotalItems(cartItems)}{" "}<i className="fa fa-shopping-cart">{" "}</i> </p>
    </div> 
  </Box>      
)

export default Items;