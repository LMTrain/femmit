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
      itemsSearched: [],
      displayingCart: false,
      displayBooks: true
      
  }

  displayingCartItems = () => {
    console.log("THIS SHOWS THE ITEMS IN THE CART")   
    this.setState({displayingCart: false})      
  };
  

  

  componentDidMount() {    
    this.setState({displayingCart: true}) 
    this.changeDeptIdState()     
  }

  changeDeptIdState = () => {    
    this.setState({itemDeptId: this.props.match.params.departmentId})
    
  }
  
  render() {
    const { displayingCart, itemDeptId, itemsSearched } = this.state

    return (
      
      <div>        
        {displayingCart ? <SeeDeptItems itemDeptId={itemDeptId} displayingCartItems={this.displayingCartItems}  itemsSearched={itemsSearched}
        />  : <SeeCartItems />}
      
      </div>
    );
      
      
  }
}; 


export default Items;