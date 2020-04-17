import React from 'react';
import './Items.css';
import { Box, Layer, Modal, Button } from 'gestalt'

function ItemModalDetails (props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="Details"
          onClick={() => { setShowModal(!showModal) }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="Item Details"
              heading="Details"
              onDismiss={() => { setShowModal(!showModal) }}
              footer={
                <Box
                  display="flex"
                  marginLeft={-1}
                  marginRight={-1}
                  justifyContent="center"
                >
                  <Box padding={1}>
                    <Button
                      size="sm"
                      text="Close"
                      onClick={() => { setShowModal(!showModal) }}
                    />
                  </Box>                 
                </Box>
              }
           
              size="md"
            >
              <Box paddingX={8}>            
                {props.itemDetails.map(itemDetail => (          
                  <div key={itemDetail._id} >               
                    <img alt={itemDetail.name} width="300" height="320" className="img-fluid" src={itemDetail.thumbnail} /><span></span>
                    <br></br>
                    <p><b>{itemDetail.name}</b></p>
                    <br></br>
                    <p><b>Price :</b>{" "} ${itemDetail.price}</p>
                    <br></br>                
                    <p><b>Description :</b> {itemDetail.description}</p>
                  </div>        
                ))}
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
export default ItemModalDetails;