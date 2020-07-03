import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from '@material-ui/core';
import history from '../history';

class CreatGrading extends React.Component {

    goToCreatePage = () => {
        history.push("/new-grading");
        window.location.reload();
    }

    render() {
        const style = {
            body: {
                backgroundColor: 'white',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
                height: '70px',
                color: 'white',
                textTransform: 'capitalize',
                fontSize: '16px',
            },
            icon: {
                marginRight: '5px'
            },
            btn: {
                position: 'absolute',
                backgroundColor: '#F2A900',
                // backgroundColor: '#330072',
                color: 'white',
                padding: '10px 0px',
                width: '24%',
                margin: 'auto',
                fontSize: '15px',
                marginTop: '10px',
                marginLeft: '1.5%',
            },
        }
        return (
            <div>
                <div style={style.body}>
                    <Button variant="contained" style={style.btn} onClick={this.goToCreatePage}>
                        <AddCircleOutlineIcon style={style.icon} />
                    create an assignment grading
                </Button>
                    <div style={style.text}></div>
                </div>
            </div>
        );
    }
}
export default CreatGrading;

