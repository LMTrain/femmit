import React from 'react';
import './Items.css';
import { Box, Text, Image, Button } from 'gestalt'
import {calculatePrice, setCart, getCart} from '../utils';
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
                {/* <Box marginTop={4} display="flex" direction="column" alignItems="center">
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
                </Box> */}
                    
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
                                            <Box height={80} width={80} >
                                                <Image
                                                    // fit="cover"
                                                    alt="item"
                                                    naturalHeight={1}
                                                    naturalWidth={1}
                                                    src={iitem.thumbnail}                                  
                                                />
                                            </Box>
                                        </Box>
                                        <Box padding={2}>
                                            <Box display="flex" direction="row">
                                                <Text bold size="sl" color="blue">
                                                    {iitem.name}                                                     
                                                </Text>
                                                <Box marginLeft={10} paddingLeft={0} paddingRight={0}>
                                                    <Button 
                                                        size="sm"
                                                        color="red"
                                                        text= "x"
                                                        onClick={() => this.deleteItemsFromCart(iitem._id)}
                                                    />
                                                </Box> 
                                            </Box>
                                            <Box display="flex" direction="row">
                                                <Text>
                                                    Qty: {iitem.quantity}
                                                </Text>                                                
                                            </Box>                                                                          
                                            <Text>
                                                Price: ${(iitem.quantity * iitem.price).toFixed(2)}
                                            </Text>                                            
                                        </Box>
                                    </Box>
                                </div>
                            ))}
                        </Box>
                        <Box column={6} marginLeft={10} marginRightt={-1} marginTop={10} paddingLeft={0} paddingRight={0}>
                            <Box align="center" display="flex" direction="column">
                                <div className="carttotal"> 
                                    <Text align="center" bold color="black" size="sm">
                                        Total ({cartItems.length} items )
                                    </Text>
                                </div>
                                <div className="carttotal"> 
                                    <Text align="center" bold size="xl" color="red">
                                        {calculatePrice(cartItems)}
                                    </Text>
                                </div>
                                <div className="carttotal"> 
                                    <Text >
                                        <Link to="/checkout"><Button padding={2} color="blue" text="Checkout"></Button>
                                        </Link>
                                    </Text>
                                </div>                                       
                            </Box>
                        </Box>                                             
                    </Box>
                </div>               
            </React.Fragment>
        );
    }
}

export default SeeCartItems;