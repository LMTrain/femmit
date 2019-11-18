import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
// prettier ignore
import { Container, Box, Text, Image, Card, Button } from 'gestalt'
// import dataSet from "./db.json";
import deals from "./db.json";
import { Link } from 'react-router-dom';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

// var shuffleData = ""
// var ShuffledDatas = []

class Allitems extends React.Component {
  state = {      
    deals,
    anItem: [],
    name: "",
    description: "",
    price: "",
    thumbnail
  }

  componentDidMount(){
   this.setState({deals});
  }

  // componentDidMount(){
  //   todaysDeals = () => {
  //     this.shuffle()
  //   }
  // }

  // shuffle = () => {
  //   let dealsArray = [...this.state.deals];
  //   let dealsShuffled = [];    
  //   for (var i = 0;  i < this.state.deals.length; i++) {        
  //         shuffleData = dealsArray.splice(Math.floor(Math.random()*dealsArray.length));        
  //         dealsShuffled = [...dealsShuffled, ...shuffleData];
  //       }   
  //       ShuffledDatas.push(this.state.deals);
  //   // Set this.state.deals equal to the new deals array
  //   this.setState({ deals: dealsShuffled });  
  // };

//   handleSubmitItem = async () => {
//     const { name, description, price, thumbnail } = this.state;

    
//     let token;
//     try {
//       // create stripe token
//         const response = await this.props.stripe.createToken();
//         token = response.token.id;
//         //create order with stripe sdk (make request to backend)
//           await strapi.createEntry('items', {
//             name,              
//             description,
//             price,
//             thumbnail,
//             token                        
//           });
//       } catch (err) {
//         this.showToast(err.message);
      
//     }
//   };

//   showToast = (toastMessage, redirect = false) => {
//     this.setState({ toast: true, toastMessage });
//     setTimeout(() => this.setState({ toast: false, toastMessage: '' },
//     // if true passed to 'redirect argument, redirect home
//         () => redirect && this.props.history.push('/')
//     ), 5000);
// };


  render() {
    // const { deals } = this.state;
    
    return (
      <Container>
        <Box>
          <Text>
            TESTING
          </Text>
        </Box>
      {/* <Box 
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
      {this.state.deals.map(allItem => (
        <Box paddingY={4} margin={2} width={200} key={allItem.itemId}>
          <Card
            image={
              <Box height={200} width={200}>
                <Link to={`/${allItem.itemId}`}>
                <Image
                  fit="cover"
                  alt="Department"
                  naturalHeight={1}
                  naturalWidth={1}
                  src={allItem.largeImage}                   
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
                  {allItem.name}
                </Text>
              </Box>
                <Text>{allItem.description}</Text>
                <Text color="orchid">${allItem.salePrice}</Text>
              <Box marginTop={2}>
                <Text bold size="xl">
                  <Button onClick={() => this.handleSubmitItem(allItem.itemId)}
                  color="blue" text="Add to DB" />
                </Text>                   
              </Box>
            </Box>
           
          </Card>
        </Box>
      ))}    
    </Box> */}
    </Container>
    );
  }
  
}                    
export default Allitems;