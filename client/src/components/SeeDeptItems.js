import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';
import API from '../utils/API';
// import axios from 'axios';
// prettier ignore
import { Box, Text, Image, Card, Button, Mask } from 'gestalt'
import { setCart, getCart} from '../utils';
import { Link } from 'react-router-dom';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

const hStyle = {
  fontSize: '30px',
  fontFamily: 'calibri light',
  fontWeight: 'bold',
};

var booksArray =[]
// var itemsDept = ""
// var itemsInCart = []

const defaultBooks = ["Wars of Law", "Among the Valiant", "Religion", "The Fall of Western Civilization", "Destruction of Black Civilization", "Sex in Antiquity", "Wars", "food", "School", "Country", "Music", "Friends", "Family", "Baby", "Politics"]
class SeeDeptItems extends React.Component {
    state = {
        items: [],
        department: '',
        cartItems: [],
        search: "",
        books: [],
        displayingCart: false
    }
    bookDeptId = () => {
        // console.log("THIS IS BOOK DEPT ===>", this.props.itemDeptId )
        // console.log("THIS IS props.itemDeptId ==>", this.props.itemDeptId) 
        let bookToSearch = defaultBooks[Math.floor(Math.random() * defaultBooks.length)];
        console.log("THIS IS THE BOOK TO SEARCH FOR", bookToSearch)
        this.searchForBooks(bookToSearch);
    }

    searchForBooks = booksearch => {       
        API.search(booksearch)        
        .then(res => {                  
          if(res.data.error ){
            console.log(res.data.error)            
          }else{           
            booksArray = res.data.items;           
            this.displayBooks();  
          }
        })          
        .catch(err => console.log(err));
    }
    
    displayBooks = () => {
      console.log("THESE ARE THE BOOK LISTs ===>", booksArray )
      this.setState({ books: booksArray })
      console.log("THESE ARE THE BOOKs in books state ===>", this.state.books )
    }

    

    async componentDidMount() {        
        if (this.props.itemDeptId === "5dcf9519dc3bcd3de001697b") {
        console.log("THIS IS BOOK DEPT ===>", this.props.itemDeptId )
        this.bookDeptId();
        } else   
        
        try {       
        const response = await strapi.request('POST', '/graphql', {
            data: {
                query: `query {
                    department(id: "${this.props.itemDeptId}") {
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
        
        // let itemsArray = [...this.state.items]
        // let itemsDept = this.state.department
        // let itemsInCart = [...this.state.cartItems]
        // console.log("THIS IS itemsArray :", itemsArray)
        // console.log("THIS IS itemsArray :", itemsDept)
        // console.log("THIS IS itemsArray :", itemsInCart)
        // this.toItemsInArray();
    } catch (err) {
        console.error(err);
    }
    }        
    
    // toItemsInArray = () => {
    //   let itemsArray = [...this.state.items]
    //   // this.setState({items:itemsArray})
    //   console.log("THIS IS items state:", this.state.items)
    //   console.log("THIS IS itemsArray :", itemsArray)
    // }
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

    displayingCartItems = () => {
        console.log("THIS SHOWS THE ITEMS IN THE CART")
        this.setState({displayingCart: false})
        // checkDeptItems = false      
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
                        <Button onClick={() => this.props.displayingCartItems()}
                            color="blue" text="View Cart"
                        />                                              
                        
                    </Box>
                </Mask>
                </Box>
                </div>
            </Box>
        )
    }             
}

export default SeeDeptItems;