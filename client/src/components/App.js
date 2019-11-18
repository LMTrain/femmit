import React, { Component } from 'react';
//prettier ignore
import {Container, Box, Heading, Card, Image, Text, Button, SearchField, Icon} from 'gestalt';
import {Link} from 'react-router-dom';
import Loader from './Loader';

import './App.css';
// import Items from './Items';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {
  state = {
   departments: [], 
   searchedItems: [],
   cartItems: [],
   items: [],
    searchTerm: '',    
    loadingDepartments: true
  };

  async componentDidMount() {
    try {

      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
           departments {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      // console.log(response);
      this.setState({departments: response.data.departments, loadingDepartments: false });
    } catch (err) {
      console.log(err);
      this.setState({ loadingDepartments: false });
    }
  }

  handleChange = ({value}) => {
    this.setState({ searchTerm: value }, () => this.searchDepartments());
  };

  // filteredDepartments = ({searchTerm,departments }) => {
  //   returndepartments.filter(department => {
  //     return (
  //       department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       department.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
  // }

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
      loadingDepartments: false
    });
  }

  render() {
    const { searchTerm, loadingDepartments, departments, searchedItems } = this.state;

    return (
      <Container>
        {/* {departments Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField"
            accessibilityLabel="Departments Search Field"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search Departments"
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
        {/*departments Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/*departments Header */}
          <Heading color="midnight" size="md">        
            Store Departments      
          </Heading>         
        </Box>
        {/* Searched items in Store Departments */}
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
                      // src={`${apiURL}${department.image.url}`}
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
        {/*departments */}
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
          {/* Display Store Departments name on Home Page */}
          {departments.map(department => (
            <Box paddingY={4} margin={2} width={200} key={department._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Link to={`/${department._id}`}>
                    <Image
                      fit="cover"
                      alt="Department"
                      naturalHeight={1}
                      naturalWidth={1}                     
                      src={`${apiURL}${department.image.url}`}
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
                  <Text bold size="xl">
                      {department.name}
                  </Text>
                    <Text>{department.description}</Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        {/* <Spinner show={loadingDepartments} accessibilityLabel="Loading Spinner" /> */}
       <Loader show={loadingDepartments} />
       {/* {loadingDepartments && <Loader />} */}
      </Container>
    );
  }
}

export default App;
