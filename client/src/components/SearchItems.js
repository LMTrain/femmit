import React, { Component } from 'react';
//prettier ignore
import { Box, SearchField, Icon} from 'gestalt';
import { Redirect } from "react-router-dom";
import { setCart, getCart } from '../utils';
// import Loader from './Loader';

import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);



class SearchItems extends Component {
  state = {
    searchedItems: [],
    searchTerm: '',
    redirect: false,   
    // loadingItems: true,
    items: [],
    cartItems: []
  
  };

  renderRedirect = () => {
    if (this.state.redirect) {          
      return <Redirect to='/searchresult' />
    }
  }

  handleChange = ({value}) => {
    this.setState({ searchTerm: value }, () => this.searchDepartments());
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
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
         items(where: {
            name_contains: "${this.state.searchTerm.toLowerCase()}"
          }) {
            _id
            name
            description
            thumbnail                       
            price
          }
        }`
      }
    });
    
    this.setState({
     searchedItems: response.data.items,
     cartItems: getCart(),    
     loadingItems: false,
     redirect: true
    });
    console.log(this.state.searchedItems);
  }

  render() {
    const { searchTerm, searchedItems } = this.state;

    return (      
      <Box align="center">

        <Box display="flex" width={900} justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField"
            accessibilityLabel="Departments Search Field"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search for items"
          />
          <Box margin={3}>
            <Icon 
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
    
        {this.renderRedirect()}       
      </Box>
    );
  }
}

export default SearchItems;