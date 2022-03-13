import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {getToken} from './utils';
import "gestalt/dist/gestalt.css";

import App from './components/App';
import Navbar from './components/Navbar'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Items from "./components/Items";
import Automotive from "./components/Automotive"
// import SearchItems from "./components/SearchItems";
import SearchResult from "./components/SearchResult"



import registerServiceWorker from './registerServiceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getToken() !== null ? 
            <Component {...props} /> : <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
            
    )} />
)

const Root = () => (
    <Router>
        
        <React.Fragment>
            <Navbar />
            <Switch>
//     Declaring pages
                <Route component={App} exact path="/" />             
                <Route component={SearchResult} exact path="/searchresult" />
                <Route component={Signin} path="/signin" />
                <Route component={Signup} path="/signup" />
                <PrivateRoute component={Checkout} path="/checkout" />                
                <Route component={Items} path="/:departmentId" />
                <Route component={Automotive} path="/5dcf94e2dc3bcd3de0016978" />
            </Switch>           
        </React.Fragment>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker();
