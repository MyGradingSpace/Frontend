import React from 'react';
import LaurierLogo from '../image/Laurier-logo.png';
import { Avatar } from '@material-ui/core';


class NavBar extends React.Component {

    render() {
        const style = {
            navBar:{
                backgroundColor: 'white',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
                height:'90px',
            },
            title:{
                position:'absolute',
                fontSize: '40px',
                display: 'inline-block',
                marginTop: '15px',
                fontFamily: "'MuseoModerno', cursive",
                color:'rgba(1,1,1,0.7)'
            },
            laurierLogo:{
                display: 'inline-block',
                height:'90px',
                marginLeft:'5%',
            },
            nameBar:{
                display: 'inline-block',
                float: 'right',
                marginTop:'25px',
                marginRight:'5%',
            },
            name:{
                marginTop: '-30px',
                marginLeft: '50px',
            },
            avatar: {
                backgroundColor: '#F2A900',
                color: '#330072',
            }
        }
        return (<div>
            <div style={style.navBar}>
            <img style={style.laurierLogo} src={LaurierLogo} alt='Laurier-Logo' />
            <div style={style.title}>MyGradingSpace</div>
            <div style={style.nameBar}>
                <Avatar variant="rounded" style={style.avatar}> NY </Avatar>
                <div style={style.name}> Nina Yang</div>
            </div>
            </div>
        </div>
        );
    }
}

export default NavBar;