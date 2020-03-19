import React, { Component } from 'react';
//prettier ignore
import { Box, Card, Image, Text, Button, Mask } from 'gestalt';
import { setCart, getCart } from '../utils';
import './App.css';
import { Link } from 'react-router-dom';
import SeeCartItems from './SeeCartItems';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);




class SearchResult extends Component {
  state = {
    searchedResult: [],
    searchTermName: '',
    searchedResults: [],    
    // loadingItems: true,
    items: [],  
    displayingCart: false,
    cartItems: []
  
  };
 
  componentDidMount() {     
    this.setState({searchTermName: this.props.searchTerm})
    console.log("THIS IS SEARCHED ITEMS NAME",  this.state.searchTermName);   
    this.searchDepartments();
   
  }

  displayingCartItems = () => {    
    this.setState({displayingCart: true})      
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
      searchedResults: response.data.items,
      cartItems: getCart()});
    console.log(this.state.searchedResults);    
  }; 

  render() {
    const { searchedResults, cartItems, displayingCart } = this.state;
    function truncateString(str, num) {    
      if (str.length > num && num > 3) {
              return str.slice(0, (num - 3)) + '...';
          } else if (str.length > num && num <= 3) {
              return str.slice(0, num) + '...';
          } else {
          return str;
      }    
    }
        

    return (
      <>
        <Box display="flex" direction="row" alignItems="center" maxWidth={1500}>

          <div className="lineitems">
              
            <Link to="5dcf94e2dc3bcd3de0016978"> 
                <div className="lineitems">
                    <p>Automotive</p>
                </div>
            </Link>

            <Link to="5dcf9519dc3bcd3de001697b">
                <div className="lineitems">                        
                    <p>Books</p> 
                </div>                     
            </Link>

            <Link to="5dcf94a0dc3bcd3de0016975">
                <div className="lineitems">                      
                    <p>Electronics</p>
                </div>
            </Link>

            <Link to="5dcf9457dc3bcd3de0016972">
                <div className="lineitems">                     
                    <p>Fashion</p>
                </div>                        
            </Link>

            <Link to="5dcf8d67dc3bcd3de001696f">  
                <div className="lineitems">                        
                    <p>Home</p>                      
                </div>
            </Link>

            <Link to="5dcf9551dc3bcd3de001697e">
                <div className="lineitems">                     
                    <p>Sports Outdoor</p>
                </div>                        
            </Link>
            
          <Box marginLeft={2} marginBottom={4} paddingX={-2}>
              <Mask shape="rounded" wash>
                <Box padding={2} display="flex">
                  {/* User Cart Heading */}
                  <Button size="sm" onClick={() => this.displayingCartItems()}
                      color="blue" text="View Cart"
                  /><p>{cartItems.length}</p><i className="fa fa-shopping-cart"></i>
                </Box>
              </Mask>
            </Box>
          </div>
        </Box>
        <div>

        {displayingCart === true ? <SeeCartItems /> : []}
        </div>
        <div className="card">
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
              {searchedResults.map(searchedItem => (
                <Box paddingY={4} margin={2} width={200} key={searchedItem._id}>
                  <Card
                    image={
                      <Box height={80} width={80}>                   
                        <Image
                          fit="cover"
                          alt="Department"
                          naturalHeight={1}
                          naturalWidth={1}
                          src={searchedItem.thumbnail}
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
                        <Text bold size="sm">
                          {searchedItem.name = truncateString(searchedItem.name, 50)}
                        </Text>
                      </Box>
                        <Text size="sm">{searchedItem.description = truncateString(searchedItem.description, 90)};</Text>
                        <Text color="orchid">${searchedItem.price}</Text>
                      <Box marginTop={2}>
                        <Text size="sm">
                          <Button size="sm" onClick={() => this.addToCart(searchedItem)}
                          color="blue" text="Add to Cart" />
                        </Text>                   
                      </Box>
                    </Box>               
                  </Card>
                </Box>
              ))}
            </Box>       
          </Box>
        </div>    
      </>
      
      
    );
  }
}

export default SearchResult;