import React, { Component } from 'react';
//prettier ignore
import {Container, Box, Card, Image, Text, Button, SearchField, Icon} from 'gestalt';
import {Link} from 'react-router-dom';
// import Loader from './Loader';

import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);



class SearchItems extends Component {
  state = {
    searchedItems: [],
    searchTerm: '',    
    // loadingItems: true,
    items: []
  
  };

  handleChange = ({value}) => {
    this.setState({ searchTerm: value }, () => this.searchDepartments());
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
    console.log(this.state.searchTerm, response.data.items);
    this.setState({
     searchedItems: response.data.items,     
     loadingItems: false
    });
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
          {searchedItems.map(searchedItem => (
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
                      {/* <Link to={`/${department._id}`}>
                      <Button onClick={() => this.addToCart(searchedItem)}
                      color="blue" text="See Item" />
                      </Link> */}
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

export default SearchItems;