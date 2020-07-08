import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoginInformation, login, getCompilingLanguage, getJobs } from '../actions';
import LoginPic from '../image/Login.jpg';
import D2L from '../D2L/valence';
import { Button, DialogContent } from '@material-ui/core';

class Login extends React.Component {

    constructor() {
        super();
        
    }
    responseGoogle = async (response) => {
        await this.props.dispatch(setLoginInformation(response));
        if (this.props.loginInformation.Rt.Bu.includes("@mylaurier.ca")) {
            await this.props.dispatch(login(true));
            await this.props.dispatch(getCompilingLanguage());
            await this.props.dispatch(getJobs());
        }
    }

    render() {
        const style = {
            img: {
                width: '90vw',
                height: '100vh',
                overflowY: 'hidden',
                position: 'absolute',
                top: '0',
                right: '0',
                zIndex: '-2',
            },
            gray:{
                backgroundColor:'#330072',
                width: '30vw',
                height: '100vh',
                overflowY: 'hidden',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '-1',
            },
            whiteBox: {
                width: '40vw',
                position: 'absolute',
                // backgroundColor: 'rgba(255,255,255,0.3)',
                height: '50%',
                left: '0',
                top: '45%',
                transform: 'translateY(-50%)',
                textAlign: 'center',
            },
            title: {
                color: '#eeb340',
                textTransform: 'capitalize',
                letterSpacing: '5px',
                fontSize: '60px',
                fontFamily: "'Raleway', sans-serif",
                textAlign: 'center',
                marginTop: '15vh',
            },
            subtitle: {
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '10px',
                fontSize: '20px',
                fontFamily: "'Raleway', sans-serif",
                textAlign: 'center',
                margin: '0',
            },
            loginbth: {
                backgroundColor: '#EEB340',
                color: 'white',
                fontSize: '17px',
                padding: '15px 80px',
                fontFamily: "'Raleway', sans-serif",
                textAlign: 'center',
                borderRadius: '80px',
                marginTop: '40px',
                wordSpacing: '1px',
            }
        }
        return (
            <div style={style.body}>
                <div style={style.gray}></div>
                <img src={LoginPic} style={style.img} />
                <div style={style.whiteBox}>
                    <p style={style.title}>My Grading Space</p>
                    <p style={style.subtitle}>Eazy Your Grading Life owo</p>
                    <GoogleLogin
                        clientId="782461757059-f5lr975a382rf04vgnu9vde71bjcfpdv.apps.googleusercontent.com"
                        render={renderProps => (<button style={style.loginbth} onClick={renderProps.onClick} disabled={renderProps.disabled}>Click Here to Login</button>)}
                        onSuccess={this.responseGoogle}
                        // onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                {/* <Button onClick={this.test}>haha</Button> */}

                {/* {!this.props.login && (<div>You have to login with your laurier account</div>)} */}
            </div>
        );
    }

}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setLoginInformation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loginInformation: state.loginInformation,
    login: state.login,
});

export default connect(mapStateToProps)(Login);