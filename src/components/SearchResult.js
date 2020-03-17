import React, { Component } from 'react';
//prettier ignore
import { Box, Card, Image, Text, Button } from 'gestalt';
import {Link} from 'react-router-dom';
import { setCart, getCart } from '../utils';
// import Loader from './Loader';
import './App.css';
// import searchedItems from './SearchItems';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);




class SearchResult extends Component {
  state = {
    searchedResult: [],
    searchTermName: '',    
    // loadingItems: true,
    items: [],  
    cartItems: []
  
  };
 

  addToCart = searchedItem => {
    const alreadyInCart = this.state.cartItems.findIndex(iitem => iitem._id === searchedItem._id);
    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...searchedItem,
        quantity: 1
      });
      this.setState({cartItems: updatedItems }, () => setCart(updatedItems));
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({cartItems: updatedItems },() => setCart(updatedItems));

    }

  };

  searchDepartments = async () => {   
    // console.log(this.state.searchTerm)
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
         items(where: {
            name_contains: "${this.state.searchTermName.toLowerCase()}"
          }) {
            _id
            name
            description
            thumbnail                       
            price
            department {
              _id
              name
            }
          }
        }`
      }
    });      
    this.setState({
      searchedResult: response.data.items,
      cartItems: getCart()});
    console.log(this.state.searchedResult);
    
  }

  
  
  componentDidMount() {     
    this.setState({searchTermName: this.props.searchTerm})
    console.log("THIS IS SEARCHED ITEMS NAME",  this.state.searchTermName);   
    this.searchDepartments();
   
  }
  

  render() {
    const { searchedResult } = this.state;

    return (      
      <Box align="center">
        <Box 
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: 'white'
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
          {searchedResult.map(searchedItem => (
            <Box paddingY={4} margin={2} width={200} key={searchedItem._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Link to={`/${searchedItem._id}`}>
                    <Image
                      fit="cover"
                      alt="Department"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={searchedItem.thumbnail}                   
             
                    />
                    </Link>
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
                      {searchedItem.name}
                    </Text>
                  </Box>
                    <Text>{searchedItem.description}</Text>
                    <Text color="orchid">${searchedItem.price}</Text>
                  <Box marginTop={2}>
                    <Text bold size="xl">
                      <Button onClick={() => this.addToCart(searchedItem)}
                      color="blue" text="Add to Cart" />
                    </Text>                   
                  </Box>
                </Box>               
              </Card>
            </Box>
          ))}
        </Box>       
      </Box>
      
      
    );
  }
}

export default SearchResult;