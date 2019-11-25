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
    this.setState({displayingCart: false})      
  };
  

  changeDeptIdState = () => { 
    console.log("THIS IS PARAMA", this.props.match.params) 
    this.setState({itemDeptId: this.props.match.params.departmentId})
    console.log("THIS IS props.match ==>", this.state.itemDeptId, "THIS IS DISpaly :", this.state.displayingCart, this.props.match.params.departmentId ) 

  }

  componentDidMount() {   
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