import React from 'react';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';


class Outline extends React.Component {

    render() {
        const style = {
            body: {
                backgroundColor: 'white',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
                marginTop: '10px',
            },
            btn: {
                backgroundColor: '#330072',
                color: 'white',
                fontSize: '12px',
                float: 'right',
                marginTop:'-5px',
            },
        }
        return (
            <div style={style.body}>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <div>Current Grading Assignments: <a style={{ color: 'red', fontWeight: 'bold' }}> 5</a></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ marginLeft: '5%', width: '90%' }}>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox1 </div>
                                <Button style={style.btn}> Details</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox2 </div>
                                <Button style={style.btn}> Details</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox5 </div>
                                <Button style={style.btn}> Details</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP494 - DropBox1 </div>
                                <Button style={style.btn}> Details</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP494 - DropBox2 </div>
                                <Button style={style.btn}> Details</Button>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <div>Unpublished Assignments: <a style={{ color: 'green', fontWeight: 'bold' }}>5</a></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div style={{ marginLeft: '5%', width: '90%' }}>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox1 </div>
                                <Button style={style.btn}> Publish</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox2 </div>
                                <Button style={style.btn}> Publish</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP493 - DropBox5 </div>
                                <Button style={style.btn}> Publish</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP494 - DropBox1 </div>
                                <Button style={style.btn}> Publish</Button>
                            </div>
                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                <div style={{ display: 'inline' }}>CP494 - DropBox2 </div>
                                <Button style={style.btn}> Publish</Button>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}
export default Outline;
