import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoginInformation, login, createUserContext, createUserInfo } from '../actions';
import LoginPic from '../image/Login.jpg';
import D2L from '../D2L/valence';

class Login extends React.Component {

    constructor(props) {
        super(props);

    }
    responseGoogle = async (response) => {
        await this.props.dispatch(setLoginInformation(response));
        if (this.props.loginInformation.Rt.Bu.includes("@mylaurier.ca")) {
            await this.props.dispatch(login(true));
        }
    }

    login = async () => {
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const loginUrl = await D2LAppContext.createUrlForAuthentication(process.env.REACT_APP_HOST_URL, 443, process.env.REACT_APP_REDIRECT_URL);
        window.open(loginUrl);
        let url = window.location.href;
        const redirectUrl = url.split("?x_a=")[0];
        url = url.split("?x_a=")[1]
        const xA = url.split("&x_b=")[0];
        url = url.split("&x_b=")[1];
        const xB = url.split("&x_c=")[0];
        const xC = url.split("&x_c=")[1];
        if (xA && xB && xC) {
            await this.props.dispatch(createUserContext(xA, xB, xC));
            await this.props.dispatch(createUserInfo(xA, xB));
            await this.props.dispatch(login(true));
            window.close();
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
            gray: {
                backgroundColor: '#330072',
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
                    <button style={style.loginbth} onClick={this.login}>Click Here to Login</button>
                </div>
            </div>
        );
    }

}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setLoginInformation: PropTypes.func.isRequired,
    userContextReducer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Login);