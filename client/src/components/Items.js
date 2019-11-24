import React from 'react';
import './Items.css';
import SeeDeptItems from './SeeDeptItems';
import SeeCartItems from './SeeCartItems';



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
    this.changeDeptIdState()
     
  }
  
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