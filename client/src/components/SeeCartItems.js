import React from 'react';
// import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';

// prettier ignore
import { Box, Text, Heading, Mask, IconButton } from 'gestalt'
import { calculatePrice } from '../utils';
import { Link } from 'react-router-dom';
// const apiURL = process.env.API_URL || 'http://localhost:1337';
// const strapi = new Strapi(apiURL);



function SeeCartItems() {
    return (
        <Box alignSelf="end" marginTop={2} marginLeft={8}>
            <Mask shape="rounded" wash>
                <Box display="flex" direction="column" alignItems="center" padding={2}>
                {/* User Cart Heading */}
                <Heading align="center" color="black" bold size="xs">Cart</Heading>
                <Text color="gray" italic>
                {cartItems.length} items selected
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
                    <Text color="red">Please select some items</Text>
                    )}
                </Box>
                <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                <Text>
                    <Link to="/checkout">Checkout</Link>
                </Text>

                </Box>
            </Box>
        </Mask>
  </Box>

    );
}

export default SeeCartItems;