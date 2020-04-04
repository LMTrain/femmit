import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL
const APIKEY = process.env.REACT_APP_APIKEY
// Export an object containing methods we'll use for accessing the Google Book API

export default { 
  search: function(booksearch) {
    return axios.get(BASEURL + booksearch + APIKEY);
  },
  
  searchId: function(keyId) {
    return axios.get("https://www.googleapis.com/books/v1/volumes/" + keyId);
  },
 
};
