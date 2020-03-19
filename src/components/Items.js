import React from 'react';
import './Items.css';
import SeeDeptItems from './SeeDeptItems';
import SeeCartItems from './SeeCartItems';
import { Link } from 'react-router-dom';
import { Box, Button, Mask } from 'gestalt';
import { setCart, getCart} from '../utils';
// import Navbar from '../components/Navbar';
// import DeptMenu from './DeptMenu';



class Items extends React.Component {
  state = {
      items: [],
      department: '',
      cartItems: [],
      itemDeptId: '',
      itemsSearched: [],
      displayingCart: false,
      displayBooks: true
      
  }

  displayingCartItems = () => {    
    this.setState({displayingCart: false })      
  };
  
  addToCart = item => {
    const alreadyInCart = this.state.cartItems.findIndex(iitem => iitem._id === item._id);
      if (alreadyInCart === -1) {
          const updatedItems = this.state.cartItems.concat({
          ...item,
          quantity: 1
          });
          this.setState({cartItems: updatedItems }, () => setCart(updatedItems));
          console.log(this.state.cartItems);
      } else {
          const updatedItems = [...this.state.cartItems];
          updatedItems[alreadyInCart].quantity += 1;
          this.setState({cartItems: updatedItems },() => setCart(updatedItems));
          console.log(this.state.cartItems);

      }

  };

  

  componentDidMount() {    
    this.setState({displayingCart: true,  cartItems: getCart()}) 
    this.changeDeptIdState()     
  }

  changeDeptIdState = () => { 
    console.log("THIS IS PROPS FROM ITEMS.JS", this.props)   
    this.setState({itemDeptId: this.props.match.params.departmentId})
    
  }
  
  render() {
    const { displayingCart, itemDeptId, itemsSearched, cartItems } = this.state

    return (
      <>
        <Box display="flex" direction="row" alignItems="center" maxWidth={1500}>

<div className="lineitems">
    
  <Link to="5dcf94e2dc3bcd3de0016978"> 
      <div className="lineitems">
          <p>Automotive</p>
      </div>
  </Link>

  <Link to="5dcf9519dc3bcd3de001697b">
      <div className="lineitems">                        
          <p>Books</p> 
      </div>                     
  </Link>

  <Link to="5dcf94a0dc3bcd3de0016975">
      <div className="lineitems">                      
          <p>Electronics</p>
      </div>
  </Link>

  <Link to="5dcf9457dc3bcd3de0016972">
      <div className="lineitems">                     
          <p>Fashion</p>
      </div>                        
  </Link>

  <Link to="5dcf8d67dc3bcd3de001696f">  
      <div className="lineitems">                        
          <p>Home</p>                      
      </div>
  </Link>

  <Link to="5dcf9551dc3bcd3de001697e">
      <div className="lineitems">                     
          <p>Sports Outdoor</p>
      </div>                        
  </Link>
  
<Box marginLeft={2} marginBottom={4} paddingX={-2}>
    <Mask shape="rounded" wash>
      <Box padding={2} display="flex">
        {/* User Cart Heading */}
        <Button size="sm" onClick={() => this.displayingCartItems()}
            color="blue" text="View Cart"
        /><p>{cartItems.length}</p><i className="fa fa-shopping-cart"></i>
      </Box>
    </Mask>
  </Box>
</div>
</Box>              
      
        <div>
          {/* <Navbar itemDeptId={itemDeptId}/>        */}
          {displayingCart ? <SeeDeptItems itemDeptId={itemDeptId} displayingCartItems={this.displayingCartItems}  itemsSearched={itemsSearched}
          />  : <SeeCartItems />}
        
        </div>
      </>
    );
      
      
  }
}; 


export default Items;