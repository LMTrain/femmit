import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
// prettier ignore
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton } from 'gestalt'
import {calculatePrice, setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class Items extends React.Component {
    state = {
        items: [],
        department: '',
        cartItems: []
    }

    async componentDidMount() {
        try {       
        const response = await strapi.request('POST', '/graphql', {
            data: {
                query: `query {
                    department(id: "${this.props.match.params.departmentId}") {
                      _id
                      name
                      items {
                        _id
                        name
                        description
                        thumbnail                       
                        price
                      }    
                    }
                }`
            }
        });
        this.setState({
            items: response.data.department.items,
            department: response.data.department.name,
            cartItems: getCart()
        })
    } catch (err) {
        console.error(err);
    }
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
        const { department, items, cartItems } = this.state;
        
        return (
            <Box
                marginTop={4}
                display="flex"
                justifyContent="center"
                alignItems="start"
                dangerouslySetInlineStyle={{
                  __style: {
                    flexWrap: 'wrap-reverse'
                  }
                }}
            >
                {/* items Section */}
                <Box display="flex" direction="column" alignItems="center">
                    {/* items Heading */}
                    <Box margin={2}>
                        <Heading bold size="md" color="black">{department}</Heading>
                    </Box>
                    {/* items */}
                    <Box
                        dangerouslySetInlineStyle={{
                            __style: {
                                backgroundColor: 'white'
                            }
                        }}
                        wrap
                        shape="rounded"
                        display="flex"
                        justifyContent="center"
                        padding={4}
                    >
                        {items.map(item => (
                            <Box paddingY={4} margin={2} width={210} key={item._id}>
                            <Card
                              image={
                                <Box height={200} width={200}>
                                  <Image
                                    fit="cover"
                                    alt="Department"
                                    naturalHeight={1}
                                    naturalWidth={1}
                                    src={item.thumbnail}
                                    // src={`${apiURL}${item.image.url}`}
                                  />
                                </Box>
                              }
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                direction="column"
                              >
                                <Box marginBottom={2}>
                                  <Text bold size="md">
                                    {item.name}
                                  </Text>
                                </Box>
                                  <Text>{item.description}</Text>
                                  <Text color="orchid">${item.price}</Text>
                                <Box marginTop={2}>
                                  <Text bold size="xl">
                                    <Button onClick={() => this.addToCart(item)}
                                    color="blue" text="Add to Cart" />
                                  </Text>
                                </Box>
                              </Box>
                            </Card>
                          </Box>                        
                        ))}
                    </Box>
                </Box>
                {/* User Cart */}
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
            </Box>
            
        )
    }
}

export default Items;