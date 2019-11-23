import React from 'react';
// import Strapi from 'strapi-sdk-javascript/build/main';
import './Items.css';
import SeeDeptItems from './SeeDeptItems';
import SeeCartItems from './SeeCartItems';
import SeeBooks from './SeeBooks';

// prettier ignore
// import { Box, Text, Heading, Image, Card, Button, Mask, IconButton } from 'gestalt'
// import { setCart, getCart} from '../utils';
// import { Link } from 'react-router-dom';
// const apiURL = process.env.API_URL || 'http://localhost:1337';
// const strapi = new Strapi(apiURL);




// var itemsArray =[]
// var itemDeptId = ""
// var itemsInCart = []
// var checkDeptItems = true
class Items extends React.Component {
  state = {
      items: [],
      department: '',
      cartItems: [],
      itemDeptId: '',
      displayingCart: false,
      displayBooks: true
  }

  displayingCartItems = () => {
    console.log("THIS SHOWS THE ITEMS IN THE CART")
    // this.setState({displayingCart: true})
    // checkDeptItems = false      
  };
  

  changeDeptIdState = () => {  
    this.setState({itemDeptId: this.props.match.params.departmentId})
    console.log("THIS IS props.match ==>", this.state.itemDeptId, "THIS IS DISpaly :", this.state.displayingCart, this.props.match.params.departmentId ) 

  }

  componentDidMount() { 
    let bookDeptId = this.props.match.params.departmentId
    if (bookDeptId === "5dcf9519dc3bcd3de001697b") {
      console.log("THIS IS BOOK DEPT ===>", bookDeptId )
      this.displayingCartItems()
    } else   
    console.log("THIS SHOWS THE ITEMS IN THE DEPARTMENT" )
    this.setState({displayingCart: true})
    // this.setState({itemDeptId: itemsDeptId})
    this.changeDeptIdState()
     
  }
  

  // async componentDidMount() {
  //     try {       
  //     const response = await strapi.request('POST', '/graphql', {
  //         data: {
  //             query: `query {
  //                 department(id: "${this.props.match.params.departmentId}") {
  //                   _id
  //                   name
  //                   items {
  //                     _id
  //                     name
  //                     description
  //                     thumbnail                       
  //                     price
  //                   }    
  //                 }
  //             }`
  //         }
  //     });        
  //     this.setState({
  //         items: response.data.department.items,
  //         department: response.data.department.name,
  //         cartItems: getCart()
  //     })
  //     let itemsArray = [...this.state.items]
  //     let itemsDept = this.state.department
  //     let itemsInCart = [...this.state.cartItems]
  //     console.log("THIS IS itemsArray :", itemsArray)
  //     console.log("THIS IS itemsArray :", itemsDept)
  //     console.log("THIS IS itemsArray :", itemsInCart)
  //     this.toItemsInArray();       
  // } catch (err) {
  //     console.error(err);
  // }    
  // }        
  
  // toItemsInArray = () => {
  //   let itemsArray = [...this.state.items]
  //   // this.setState({items:itemsArray})
  //   console.log("THIS IS items state:", this.state.items)
  //   console.log("THIS IS itemsArray :", itemsArray)
  // }
  // addToCart = item => {
  //   const alreadyInCart = this.state.cartItems.findIndex(iitem => iitem._id === item._id);
  //   if (alreadyInCart === -1) {
  //     const updatedItems = this.state.cartItems.concat({
  //       ...item,
  //       quantity: 1
  //     });
  //     this.setState({cartItems: updatedItems }, () => setCart(updatedItems));
  //   } else {
  //     const updatedItems = [...this.state.cartItems];
  //     updatedItems[alreadyInCart].quantity += 1;
  //     this.setState({cartItems: updatedItems },() => setCart(updatedItems));

  //   }

  // };

  // deleteItemsFromCart = itemToDeleteId => {
  //   const filteredItems = this.state.cartItems.filter(
  //     iitem => iitem._id !== itemToDeleteId
  //   );
  //   this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
  // };

  render() {
    const { displayingCart, itemDeptId } = this.state

    return (
      <div>
        {displayingCart ? <SeeDeptItems itemDeptId={itemDeptId} displayingCartItems={this.displayingCartItems} 
/>  : <SeeCartItems />}
      </div>
    );
      
      
  }
}; 


export default Items;