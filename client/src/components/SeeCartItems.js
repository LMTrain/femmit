import React from 'react';
import './Items.css';
import { Box, Text, Image, Button, Column } from 'gestalt'
import {calculateTotalItems, calculatePrice, setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
import './Items.css';


const hStyle = {
    fontSize: '24px',
    fontFamily: 'calibri light',
    fontWeight: 'bold',
    textAlign: 'center',
};


class SeeCartItems extends React.Component {
    state = {       
        cartItems: []
    }

    componentDidMount() {
        this.setState({ cartItems: getCart() })        
    }    
    
    addToCart = item => {        
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
            this.setState({cartItems: updatedItems },() => setCart(updatedItems));

        }

    };

    countItemToDelete = itemToDeleteId => {
        const alreadyInCartToDel = this.state.cartItems.findIndex(allItems => allItems._id === itemToDeleteId);
       
        if (alreadyInCartToDel !== 1) {
            console.log("THIS IS ALREADY IN CART", alreadyInCartToDel);
            this.deleteItemsFromCart(itemToDeleteId);
            // const updatedItems = this.state.cartItems.concat({
            // ...item,
            // quantity: 1
            // });
            // this.setState({cartItems: updatedItems }, () => setCart(updatedItems));
        } else {
            console.log( this.state.cartItems );
            console.log( this.state.cartItems, "THIS IS CART ITEMS" );
            this.deleteItemsFromCart(itemToDeleteId);
            // const updatedItems = [...this.state.cartItems];
            // updatedItems[alreadyInCart].quantity += 1;
            // this.setState({cartItems: updatedItems },() => setCart(updatedItems));
        }
    }

    deleteItemsFromCart = itemToDeleteId => {       
        const filteredItems = this.state.cartItems.filter(
            iitem => iitem._id !== itemToDeleteId
        );
        console.log("THIS IS ITEM TO DELETE", itemToDeleteId)
        // if (itemToDeleteId )
        this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
    };

    render() {
        const { cartItems } = this.state;
        return (
            <React.Fragment>
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
                <p>{" "}{calculateTotalItems(cartItems)}{" "}<i className="fa fa-shopping-cart">{" "}</i> </p>
            </div> 
          </Box>
                    
                <Box alignSelf="end" marginTop={292} marginLeft={8} marginRight={8} padding={4}>
                    <Box margin={2}>
                        <div style={hStyle}>
                            Shopping Cart
                        </div>
                    </Box>
                </Box> 
                
                {/* Cart Items*/}
                <div className="card">
                    <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                        <Box margin={2}>
                            {cartItems.length === 0 && (
                            <Text color="red">Please select some items</Text>
                            )}
                        </Box>                                   
                    </Box>
                    <Box display="flex" direction="row" column={6} paddingX={2}>
                        <Box>
                            {cartItems.map(iitem => (                            
                                <div className="card-item">
                                    <Box key={iitem._id} display="flex" direction="row" marginTop={2} marginLeft={3} paddingLeft={2} paddingRight={2}>
                                        {/* <Card width={300}>                           */}
                                        <Box display="flex" direction="row">
                                            <Box  height={120} width={80}>
                                                <Image
                                                    fit="cover"
                                                    alt="item"
                                                    naturalHeight={1}
                                                    naturalWidth={1}
                                                    src={iitem.thumbnail}                                  
                                                />
                                            </Box>
                                        </Box>
                                        <Box padding={2}>
                                            <Box display="flex" direction="row" marginBottom={5}>
                                                <Text bold size="sl" color="blue">
                                                    {iitem.name}                                                     
                                                </Text>
                                            </Box>
                                            {/* <Box display="flex" direction="row">
                                                <Text size="sm" color="white">
                                                    Items                                                  
                                                </Text>
                                            </Box> */}
                                            <Box display="flex" direction="row">
                                                <Text color="orchid" size="sm">
                                                    Unit Price: ${iitem.price}
                                                </Text>                                               
                                            </Box>
                                            <Box display="flex" direction="row">
                                                <Text color="green" size="sm">
                                                    Qty: {iitem.quantity}
                                                </Text>                                                                                                                             
                                            </Box>
                                            <Text color="green" size="sm">
                                                Price: ${(iitem.quantity * iitem.price).toFixed(2)}
                                            </Text>
                                            <Box  display="flex" direction="row">
                                                <div className="delete-button">                                                
                                                    <button onClick={() => this.countItemToDelete(iitem._id)}>Delete</button>                                  
                                                </div> 
                                                <div className="save-for-later">                                                
                                                    <p>Save for later</p>                                  
                                                </div>
                                                <div className="save-for-later">                                                
                                                    <p>Compare with similar item</p>                                  
                                                </div>                                                              
                                            </Box>  
                                        </Box>
                                    </Box>
                                </div>
                            ))}
                        </Box>
                        <Box column={4} marginLeft={10} marginTop={10} width={150}>
                        <div className="carttotal">                            
                                <Box align="center" display="flex" direction="column" width={550}>
                                    <div className="carttotal"> 
                                        <Text bold color="black" size="sm">                                        
                                            Subtotal ({calculateTotalItems(cartItems)} items ){": "}
                                        </Text>
                                        <Text align="center" bold size="md" color="red">
                                            {calculatePrice(cartItems)}
                                            
                                        </Text>
                                    </div>                                
                                    <Box width={250}> 
                                        <Text >
                                            <Link to="/checkout"><Button padding={2} size="md" width={550} color="blue" text="Checkout"></Button>
                                            </Link>
                                        </Text>
                                    </Box>                                       
                                </Box>                          
                            </div>
                        </Box>                                             
                    </Box>
                </div>               
            </React.Fragment>
        );
    }
}

export default SeeCartItems;
