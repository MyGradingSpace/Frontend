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
                display:"relative",
                color: 'white',
                textTransform: 'capitalize',
                fontSize: '16px',
            },
            icon: {
                marginRight: '5px'
            },
            btn: {
                backgroundColor: '#F2A900',
                color: 'white',
                padding: '10px 10px',
                width: '90%',
                marginLeft:'5%',
                fontSize: '15px',
                marginTop: '10px',
                marginBottom: '10px',
            },
        }
        return (
            <div>
                <div style={style.body}>
                    <Button variant="contained" style={style.btn} onClick={this.goToCreatePage}>
                        <AddCircleOutlineIcon style={style.icon} />
                    create an assignment grading
                </Button>
                </div>
            </div>
        );
    }
}
export default CreatGrading;

