import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';
import API from '../utils/API';
import Loader from './Loader';
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
var itemsBooksArray = []
var bookPrice = ""
var bookThumbnail = ""
var ShuffledDatas = []
var shuffleData = []

const defaultBooks = ["Wars of Law", "Among the Valiant", "Religion", "The Fall of Western Civilization", "Destruction of Black Civilization", "Sex in Antiquity", "Wars", "food", "School", "Country", "Music", "Friends", "Family", "Baby", "Politics"]
class SeeDeptItems extends React.Component {
    state = {
        items: [],
        department: '',
        departmentId: '',
        cartItems: [],
        search: "",
        books: [],
        displayingCart: false,
        loadingItems: true
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
      this.setState({ books: booksArray, department: "Books" })
      console.log("THESE ARE THE BOOKs in books state ===>", "department :", this.state.department, "==>", this.state.books )

      for (var i = 0;  i < booksArray.length; i++) { 
        let bookId = String(booksArray[i].etag)      
        let bookName = String(booksArray[i].volumeInfo.title)
        let bookDescription = String(booksArray[i].volumeInfo.description)
        let bookAuthor = String(booksArray[i].volumeInfo.authors)
        let bookPublishDate = String(booksArray[i].volumeInfo.publishedDate)
        if (booksArray[i].volumeInfo.imageLinks == null) {
          bookThumbnail = 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg'         
        }else{
          bookThumbnail = String(booksArray[i].volumeInfo.imageLinks.thumbnail)   
        }        
       
        if (booksArray[i].saleInfo.saleability === "NOT_FOR_SALE") {
          bookPrice = Number(0.00)          
        }else{
          bookPrice = String(booksArray[i].saleInfo.retailPrice.amount)          
        }
        function truncateString(str, num) {    
          if (str.length > num && num > 3) {
                  return str.slice(0, (num - 3)) + '...';
              } else if (str.length > num && num <= 3) {
                  return str.slice(0, num) + '...';
              } else {
                  return str;
          }
        
        }
        let authorLabel = " || Author : "
        let pulishedLabel = " || Pulished Date : "
        bookDescription = truncateString(bookDescription, 180) + "\n" + authorLabel + bookAuthor + "\n" + pulishedLabel + bookPublishDate;

        itemsBooksArray.push({"_id": bookId, "name": bookName, "description": bookDescription, "thumbnail": bookThumbnail, "price": bookPrice })
      }
      console.log("THIS ARE THE DISPLAY BOOKS==>", itemsBooksArray)
      this.setState({
        items: itemsBooksArray,
        loadingItems: false,      
        cartItems: getCart()            
    })        
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
            departmentId: response.data.department._id,
            loadingItems: false,
            cartItems: getCart()            
        })        
    } catch (err) {
        console.error(err);
    }
    this.shuffle()
    console.log("THIS ARE THE ITEMS==>", this.state.items, "THIS IS THE DEPT ID==>", this.state.departmentId )
  }
  shuffle = () => {
    let itemsArray = [...this.state.items];
    let itemsShuffled = [];    
    for (var i = 0;  i < this.state.items.length; i++) {        
          shuffleData = itemsArray.splice(Math.floor(Math.random()*itemsArray.length/2));        
          itemsShuffled = [...itemsShuffled, ...shuffleData];
        }   
        ShuffledDatas.push(this.state.items);
    // Set this.state.deals equal to the new deals array
    this.setState({ items: itemsShuffled });
    // itemsArray = [...this.state.deals];
    // this.setState({Items: deals});
    
  };
        
    
    addToCart = item => {
      const alreadyInCart = this.state.cartItems.findIndex(iitem => iitem._id === item._id);
        if (alreadyInCart === -1) {
            const updatedItems = this.state.cartItems.concat({
            ...item,
            quantity: 1
            });
            this.setState({cartItems: updatedItems }, () => setCart(updatedItems));
            console.log(this.state.cartItems);
        } else {
            const updatedItems = [...this.state.cartItems];
            updatedItems[alreadyInCart].quantity += 1;
            this.setState({cartItems: updatedItems },() => setCart(updatedItems));
            console.log(this.state.cartItems);

        }

    };
    

    deleteItemsFromCart = itemToDeleteId => {
        const filteredItems = this.state.cartItems.filter(
            iitem => iitem._id !== itemToDeleteId
        );
        this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
    };
    
    render() {
        const { department, items, cartItems, loadingItems } = this.state;
        
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
                {/* Store Department List */}
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
                <Loader show={loadingItems} />
            </Box>
        )
    }             
}

export default SeeDeptItems;