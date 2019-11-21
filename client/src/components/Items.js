import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';

// prettier ignore
import { Box, Text, Image, Card, Button, Mask, IconButton } from 'gestalt'
import {calculatePrice, setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

const hStyle = {
  fontSize: '30px',
  fontFamily: 'calibri light',
  fontWeight: 'bold',
};


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
                  <div style={hStyle}>{department}</div>
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
            <div className="lineitems">
              <Link to="5dcf94e2dc3bcd3de0016978">
                <Text size="ml" color="black">
                  Automotive
                </Text>
              </Link>
              <Link to="5dcf9519dc3bcd3de001697b">
                <Text size="ml" color="black">
                Books
                </Text>
              </Link>
              <Link to="5dcf94a0dc3bcd3de0016975">
                <Text size="ml" color="black">
                Electronics
                </Text>
              </Link>
              <Link to="5dcf9457dc3bcd3de0016972">
                <Text size="ml" color="black">
                Fashion
                </Text>
              </Link>
              <Link to="5dcf8d67dc3bcd3de001696f">
                <Text size="ml" color="black">
                Home
                </Text>
              </Link>
              <Link to="5dcf9551dc3bcd3de001697e">
                <Text size="ml" color="black">
                Sports & Outdoor
                </Text>
              </Link>
              <Box marginTop={2} >
                <Mask shape="rounded" wash>
                  <Box padding={2}>
                    {/* User Cart Heading */}
                    <i className="fa fa-shopping-cart"> {cartItems.length}</i>                                                
                      <Text>
                        <Link to="/checkout">View Cart</Link>
                      </Text>
                  </Box>
                </Mask>
              </Box>
            </div>
          </Box>             
        )
    }
}

export default Items;