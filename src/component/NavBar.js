import React from 'react';
import LaurierLogo from '../image/Laurier-logo.png';
import logo from '../image/logo.PNG';
import { Avatar } from '@material-ui/core';
import history from '../history';


class NavBar extends React.Component {

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
                            <Avatar variant="rounded" style={style.avatar}> NY </Avatar>
                            <div style={style.name}> Nina Yang</div>
                        </div>
                    </div>
                </div>
                <div style={style.smallBar}>
                    <a onClick={() => { history.push("/"); window.location.reload() }}>Home{' '}</a>
                    <a>{' '} Help {' '}</a>
                    <a onClick={() => { localStorage.clear(); window.location.reload() }}>{' '} Logout</a>
                </div>
            </>
        );
    }
}

export default NavBar;