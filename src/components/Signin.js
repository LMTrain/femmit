import React from  'react'
import { Container, Box, Button, TextField} from 'gestalt'
import {setToken} from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);


const hStyle = {
    fontSize: '22px',
    fontFamily: 'calibri light',
    fontWeight: 'bold',
    color: 'black',
    
  };

class Signin extends React.Component {
    state = {
        username: '',        
        password: '',
        toast: false,
        toastMessage: '',
        loading: false
    }

    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({[event.target.name]: value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password } = this.state;

        if (this.isFormEmpty(this.state)) {
            this.showToast("Fill in all fields");
            return;
        }
        
        //Sign up user
        try {
            this.setState({ loading: true});           
            const response = await strapi.login(username, password);
            this.setState({ loading: false});
            setToken(response.jwt);            
            this.redirectUser('/');
        }catch (err) {
            this.setState({ loading: false});
            this.showToast(err.message);
        }
    };

    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({username, password}) => {
        return !username || !password;
    };

    showToast = toastMessage => {
        this.setState({ toast: true, toastMessage });
        setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
    }

    render() {
        const { toastMessage, toast, loading } = this.state;

        return (
            <Container>
                <Box
                    dangerouslySetInlineStyle={{
                        __style: {
                        //   backgroundColor: 'white',
                          
                          
                        }
                      }}
                    margin={4}
                    padding={4}
                    shape="rounded"
                    display="flex"
                    justifyContent="center"
                    width={550}
                >
                    {/* Sign in Form */}
                    <form className="container max-w-md mx-auto p-8 m-2 shadow-lg rounded bg-gray"
                    style={{
                        display: 'inlineBlock',
                        textAlign: 'center',
                        maxWidth: 450,
                        height: 210,                        
                        
                        
                    }}
                    onSubmit={this.handleSubmit}                    
                    >
                        {/* Sign in Form Heading */}
                        <Box
                            marginBottom={2}
                            marginTop={-3}
                            display="flex"
                            direction="column"
                            alignItems='center'
                        >
                            <div style={hStyle} color="black" >Sign In</div>
                                                     
                        </Box>
                        {/* Username Input */}
                        <Box  marginBottom={2}>
                        <TextField
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                        />                   
                        </Box>
                        {/* Password Input */}
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <Box margiginTop={5} paddingY={2}>
                            <Button
                                inline 
                                disabled={loading} 
                                color="blue" 
                                text="Submit" 
                                type="submit" 
                            />
                        </Box>
                    </form>
                </Box>
                <ToastMessage show={toast} message={toastMessage}/>
            </Container>        
        );
    }
}

export default Signin;