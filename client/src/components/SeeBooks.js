import React from 'react';
// import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';
// prettier ignore
import { Box, Heading, Text, Mask, IconButton } from 'gestalt'
import {calculatePrice, setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
// const apiURL = process.env.API_URL || 'http://localhost:1337';
// const strapi = new Strapi(apiURL);

class SeeBooks extends React.Component {
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
            <Box alignSelf="end" marginTop={2} marginLeft={8}>
                <Mask shape="rounded" wash>
                    <Box display="flex" direction="column" alignItems="center" padding={2}>
                    {/* User Cart Heading */}
                    <Heading align="center" color="black" bold size="xs">Cart</Heading>
                    <Text color="gray" italic>
                    {cartItems.length} BOOKS selected
                    </Text>
    
                    {/* Cart Items*/}
                    {cartItems.map(iitem => (
                    <Box key={iitem._id} display="flex" alignItems="center">
                        <Text>
                        {iitem.name} x {iitem.quantity} - ${(iitem.quantity * iitem.price).toFixed(2)}
                        </Text>
                        <IconButton 
                        accessibilityLabel="Delete Item"
                        icon="cancel"
                        size="sm"
                        iconColor="red"
                        onClick={() => this.deleteItemsFromCart(iitem._id)}
                        />
    
                    </Box>
                    ))}
    
                    <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                    <Box margin={2}>
                        {cartItems.length === 0 && (
                        <Text color="red">THIS IS FOR BOOKS</Text>
                        )}
                    </Box>
                    <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                    <Text>
                        <Link to="/checkout">BOOKS</Link>
                    </Text>
    
                    </Box>
                </Box>
            </Mask>
      </Box>
    
        );
    }



}

export default SeeBooks;