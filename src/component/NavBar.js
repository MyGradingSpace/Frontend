import React from 'react';
import LaurierLogo from '../image/Laurier-logo.png';
import logo from '../image/logo.PNG';
import { Avatar } from '@material-ui/core';
import history from '../history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import D2L from '../D2L/valence';
import axios from 'axios';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial: '',
            name: '',
        }
    }

    test = async () => {
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        const URL = D2LUserContext.createAuthenticatedUrl("/d2l/api/le/1.10/219419/dropbox/folders/54721/submissions/", "get");
        const data = (await axios.get(URL)).data;
        console.log(data);
    }

    componentDidMount = async () => {
        if (this.props.user.FirstName) {
            const name = this.props.user.FirstName + ' ' + this.props.user.LastName;
            const initial = this.props.user.FirstName[0] + this.props.user.LastName[0];
            await this.setState({ name: name });
            await this.setState({ initial: initial });
        }
    }

    logout = () =>{
        localStorage.clear(); 
        window.location.reload();
    }

    render() {
        const style = {
            navBar: {
                backgroundColor: 'white',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
                height: '90px',
            },
            title: {
                position: 'absolute',
                fontSize: '40px',
                display: 'inline-block',
                marginTop: '15px',
                fontFamily: "'MuseoModerno', cursive",
                color: 'rgba(1,1,1,0.7)'
            },
            laurierLogo: {
                display: 'inline-block',
                height: '90px',
                marginLeft: '5%',
            },
            logo: {
                display: 'inline-block',
                height: '90px',
                marginLeft: '-50px'
            },
            nameBar: {
                display: 'inline-block',
                float: 'right',
                marginTop: '25px',
                marginRight: '5%',
            },
            name: {
                marginTop: '-30px',
                marginLeft: '50px',
            },
            avatar: {
                backgroundColor: '#F2A900',
                color: '#330072',
            },
            smallBar: {
                marginTop: '10px',
                width: '100%',
                backgroundColor: 'white',
                height: '30px',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
            }
        }
        return (
            <>
                <div>
                    <div style={style.navBar}>
                        <img style={style.laurierLogo} src={LaurierLogo} alt='Laurier-Logo' />
                        <img style={style.logo} src={logo} alt='Logo' />
                        <div style={style.nameBar}>
                            <Avatar variant="rounded" style={style.avatar}> {this.state.initial} </Avatar>
                            <div style={style.name}> {this.state.name}</div>
                        </div>
                    </div>
                </div>
                <div style={style.smallBar}>
                    <a onClick={() => { history.push("/"); window.location.reload() }}>Home{' '}</a>
                    <a onClick={this.test}>{' '} Help {' '}</a>
                    <a onClick={this.logout}>{' '} Logout</a>
                </div>
            </>
        );
    }
}

NavBar.propTypes = {
};

const mapStateToProps = (state) => ({
    userContext: state.userContext,
    user: state.user,
});

export default connect(mapStateToProps)(NavBar);