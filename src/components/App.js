import React, { Component } from 'react';
//prettier ignore
import {Container, Box, Card, Image, Text, SearchField, Icon } from 'gestalt';
import {Link, Redirect} from 'react-router-dom';
import Loader from './Loader';
import SearchResult from './SearchResult';
// import Navbar from '../components/Navbar';

import './App.css';
// import Items from './Items';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);



const hStyle = {
  fontSize: '30px',
  fontFamily: 'calibri light',
  
};

class App extends Component {
  state = {
   departments: [],
   department: [],
   departmentId: [],    
   cartItems: [],
   items: [],
   searchedItems:[],
   searchTerm: '',   
    loadingDepartments: true,
    redirect: false,
    searchTermState: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {          
      return <Redirect to='/SearchResult' />
    }
  }

  

  // Connect Graphql using Strapi SDK
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

  
  searchDepartments = async () => {   
    // console.log(this.state.searchTerm)
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
            department {
              _id
              name
            }
          }
        }`
      }
    });
    this.setState({
      searchedItems: response.data.items,     
      loadingDepartments: false,
      redirect: true,
      searchTermState: true
    });
    
  }

  render() {
    const { searchTerm, searchTermState, loadingDepartments, departments } = this.state;
    
    return (
      <>
      {/* <Navbar itemDeptId={departments}/> */}
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
          <div style={hStyle} color="black" >        
            Shop by Departments      
          </div>
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
                  <Text bold size="md">
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
      <div>   
      {searchTermState ? <SearchResult searchTerm={searchTerm}/> : this.state.searchTerm === null && <SearchResult searchTerm={this.state.searchTerm}/>}
       {this.renderRedirect()}
      </div>
      </Container>
      </>
    );
  }
}

export default App;
