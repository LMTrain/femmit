import React from 'react';
import './Items.css';
import SeeDeptItems from './SeeDeptItems';
import SeeCartItems from './SeeCartItems';
// import Navbar from '../components/Navbar';
// import DeptMenu from './DeptMenu';



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
    this.setState({displayingCart: false})      
  };
  

  

  componentDidMount() {    
    this.setState({displayingCart: true}) 
    this.changeDeptIdState()     
  }

  changeDeptIdState = () => { 
    console.log("THIS IS PROPS FROM ITEMS.JS", this.props)   
    this.setState({itemDeptId: this.props.match.params.departmentId})
    
  }
  
  render() {
    const { displayingCart, itemDeptId, itemsSearched } = this.state

    return (
      
      <div>
        {/* <Navbar itemDeptId={itemDeptId}/>        */}
        {displayingCart ? <SeeDeptItems itemDeptId={itemDeptId} displayingCartItems={this.displayingCartItems}  itemsSearched={itemsSearched}
        />  : <SeeCartItems />}
      
      </div>
    );
      
      
  }
}; 


export default Items;