import React from 'react';
import './Items.css';
import { Box, Heading, Text, Image, Button, IconButton } from 'gestalt'
import {calculatePrice, setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
import './Items.css';


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

    deleteItemsFromCart = itemToDeleteId => {
        const filteredItems = this.state.cartItems.filter(
            iitem => iitem._id !== itemToDeleteId
        );
        this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
    };

    render() {
        const { cartItems } = this.state;
        return (
            <React.Fragment>

                <div className="cartitems">
                    
                        <Link to="5dcf94e2dc3bcd3de0016978"> 
                            <div className="cartitems">
                                <p>Automotive</p>
                            </div>
                        </Link>

                        <Link to="5dcf9519dc3bcd3de001697b">
                            <div className="cartitems">                        
                                <p>Books</p> 
                            </div>                     
                        </Link>

                        <Link to="5dcf94a0dc3bcd3de0016975">
                            <div className="cartitems">                      
                                <p>Electronics</p>
                            </div>
                        </Link>

                        <Link to="5dcf9457dc3bcd3de0016972">
                            <div className="cartitems">                     
                                <p>Fashion</p>
                            </div>                        
                        </Link>

                        <Link to="5dcf8d67dc3bcd3de001696f">  
                            <div className="cartitems">                        
                                <p>Home</p>                      
                            </div>
                        </Link>

                        <Link to="5dcf9551dc3bcd3de001697e">
                            <div className="cartitems">                     
                                <p>Sports Outdoor</p>
                            </div>                        
                        </Link>
                    
                </div>
                    
                <Box alignSelf="end" marginTop={292} marginLeft={8} marginRight={8} padding={4}>
                    
                    <Box display="flex" direction="column" padding={4}>
                        {/* User Cart Heading */}
                        <Box align="center" padding={6}>
                            <Heading align="center" color="black" bold size="xs">Shopping Cart</Heading>
                            <Box align="center" display="flex" direction="row">
                            <div className="carttotal"> 
                                <Text align="center" color="black" size="xl">
                                    Total ({cartItems.length} items ):
                                </Text>
                            </div>
                            <div className="carttotal"> 
                                <Text align="center" bold size="xl" color="red">
                                    {calculatePrice(cartItems)}
                                </Text>
                            </div>
                            <div className="carttotal"> 
                                <Text >
                                    <Link to="/checkout"><Button padding={4} color="blue" text="Checkout"></Button>
                                    </Link>
                                </Text>
                            </div>
                            </Box>
                        </Box>
    
                    {/* Cart Items*/}
                    {cartItems.map(iitem => (                            
                    <Box key={iitem._id} display="flex" padding={2} align="left" direction="column">
                        <div className="container max-w-md p-2 m-2 shadow-lg rounded bg-gray">
                        {/* <Card width={300}>                           */}
                            <Box height={200} width={180} align="left">
                            <Image
                                // fit="cover"
                                alt="item"
                                naturalHeight={1}
                                naturalWidth={1}
                                src={iitem.thumbnail}                                  
                            />
                            </Box>
                        <Box padding={4}>
                            <Box display="flex" direction="row">
                                <Text bold size="sl" color="blue">
                                    {iitem.name} 
                                    <IconButton 
                                        accessibilityLabel="Delete Item"
                                        icon="cancel"
                                        size="sm"
                                        iconColor="red"
                                        onClick={() => this.deleteItemsFromCart(iitem._id)}
                                    />
                                </Text>
                            </Box>

                            <Text>
                                Qty: {iitem.quantity}
                            </Text>
                            <Text>
                                Price: ${(iitem.quantity * iitem.price).toFixed(2)}

                            </Text>
                                <hr></hr>
                        </Box>                            
                        
                    </div>    
                    {/* </Card> */}
                    </Box>
                    ))}
    
                    <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                        <Box margin={2}>
                            {cartItems.length === 0 && (
                            <Text color="red">Please select some items</Text>
                            )}
                        </Box>
                        <Text size="lg">Total: {calculatePrice(cartItems)}</Text>    
                    </Box>
                    </Box>
                
                </Box>        
        
               
            </React.Fragment>
        );
    }



}

export default SeeCartItems;