import React from 'react';
import Table from './Table'
import {Button} from '@material-ui/core'

class GradingStatus extends React.Component{


    render(){
        const style={
            body:{
                padding: '20px 40px'
            },
            title:{
                fontSize: '20px',
                textTransform: 'uppercase',
                color:'#330072',
                display:'inline',
                marginLeft:'20px',
            },
            btn:{
                // float:'right',
                backgroundColor:'#F2A900',
                fontSize:'15px',
                color: 'white',
                padding: '10px 50px'

            }
        }
        return (
            <div style={style.body}>
                <div style={style.title}>Course:</div> <a> CP494</a>
                <div style={style.title}>Dropbox:</div> <a>Dropbox1</a>
                <div style={style.title}>Grading Status:</div> <a>100/100</a>
                <Table/>
                <Button style={style.btn}>Publish this assignment</Button>
            </div>
        );
    }
}

export default GradingStatus;