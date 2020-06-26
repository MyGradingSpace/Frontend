import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Button } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import history from '../history';

class Home extends React.Component {

    toGradingPage = () =>{
        history.push('/status');
        window.location.reload();
    }

    render() {
        const style = {
            card: {
                width: '80%',
                marginLeft: '5%',
                padding: '4% 5%',
            }
        }
        return (
            <div>
                <div style={style.card}>
                    <div style={{ textTransform: 'uppercase', color: '#330072', fontSize: '20px', marginBottom: '10px' }}>Unpublished Assignment</div>
                    <CheckCircleOutlineIcon style={{ color: 'green', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} />
                    <div style={{ marginLeft: '50px' }}>
                        <div>Course: <b>Cp493</b></div>
                        <div>DropBox: <b>DropBox1</b></div>
                        <div>Grading: <b>100/100</b></div>
                    </div>
                    <Button style={{backgroundColor:'#330072', color:'white', fontSize:'14px', marginTop:'20px'}} onClick={this.toGradingPage}>View Grading Result</Button>
                </div>

                <div style={style.card}>
                    <div style={{ textTransform: 'uppercase', color: '#330072', fontSize: '20px', marginBottom: '10px' }}>Current Grading Assignment</div>
                    <CachedIcon style={{ color: 'red', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} />
                    <div style={{ marginLeft: '50px' }}>
                        <div>Course: <b>Cp493</b></div>
                        <div>DropBox: <b>DropBox1</b></div>
                        <div>Grading: <b>50/100</b></div>
                    </div>
                    <Button style={{backgroundColor:'#330072', color:'white', fontSize:'14px', marginTop:'20px'}}>View Grading Result</Button>
                </div>

                <div style={style.card}>
                    <div style={{ textTransform: 'uppercase', color: '#330072', fontSize: '20px', marginBottom: '10px' }}>Unpublished Assignment</div>
                    <CheckCircleOutlineIcon style={{ color: 'green', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} />
                    <div style={{ marginLeft: '50px' }}>
                        <div>Course: <b>Cp493</b></div>
                        <div>DropBox: <b>DropBox1</b></div>
                        <div>Grading: <b>100/100</b></div>
                    </div>
                    <Button style={{backgroundColor:'#330072', color:'white', fontSize:'14px', marginTop:'20px'}}>View Grading Result</Button>
                </div>

            </div>

        )
    }
}

export default Home;