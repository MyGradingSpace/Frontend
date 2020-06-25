import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Dialog, Stepper, Step, StepLabel, Select, MenuItem } from '@material-ui/core';

class CreatGrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            steps: 0,
        }
    }

    openDialog = () => {
        this.setState({ dialogOpen: true });
    }

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    handleBack = () => {
        this.setState({ steps: this.state.steps - 1 });
    }

    handleNext = () => {
        if(this.state.steps === 3){
            this.closeDialog();
        }else{
            this.setState({ steps: this.state.steps + 1 });
        }   
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
            dialog: {
                width: '600px',
                height: '400px',
            },
            content: {
                width: '80%',
                margin: 'auto',
            },
            btnGroup: {
                position: 'absolute',
                bottom: '10%',
                right: '10%',
            }
        }

        const stepInstruction = ['Select Course and Dropbox', 'Update Test and Answer Files', 'Veiw All'];
        return (
            <div>
                <div style={style.body}>
                    <Button variant="contained" style={style.btn} onClick={this.openDialog}>
                        <AddCircleOutlineIcon style={style.icon} />
                    create an assignment grading
                </Button>
                    <div style={style.text}></div>
                </div>

                <Dialog onClose={this.closeDialog} open={this.state.dialogOpen}>
                    <div style={style.dialog}>
                        <Stepper activeStep={this.state.steps} alternativeLabel>
                            {stepInstruction.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div style={style.content}>
                            {this.state.steps === 0 && (<div>
                                <div style={{ display: 'inline', marginRight: '20px', marginBottom: '30px' }}>Select Course: </div>
                                <Select onChange={null} style={{ width: '200px', marginBottom: '30px' }}>
                                    <MenuItem value={10}>CP494</MenuItem>
                                    <MenuItem value={20}>CP493</MenuItem>
                                    <MenuItem value={30}>CP264</MenuItem>
                                </Select>
                                <br />
                                <div style={{ display: 'inline', marginRight: '20px' }}>Select Dropbox: </div>
                                <Select onChange={null} style={{ width: '200px', marginBottom: '30px' }}>
                                    <MenuItem value={10}>Dropbox1</MenuItem>
                                    <MenuItem value={20}>Dropbox2</MenuItem>
                                    <MenuItem value={30}>Dropbox3</MenuItem>
                                </Select>
                            </div>)}

                            {this.state.steps === 1 && (<div>
                                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', marginBottom: '20px' }}>
                                    <div>Testing  Input File</div>
                                    <div>Sample Answer File</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', marginBottom: '10px' }}>
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', marginBottom: '10px' }}>
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', marginBottom: '10px' }}>
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                    <input type='file' className='input' accept=".*" onChange={null} />
                                </div>
                            </div>)}

                            {this.state.steps === 2 && (<div>
                                <div style={{ marginBottom: '10px' }}> Creat a new assignment grading for <b>CP493</b> - <b>Dropbox1</b></div>
                                <div> Case1:  Test File: Answer File:</div>
                                <div> Case2:  Test File: Answer File:</div>
                                <div> Case3:  Test File: Answer File:</div>
                            </div>)}

                            {this.state.steps === 3 && (<div>
                                <div style={{ marginBottom: '10px' }}> You All Set!</div>
                                <div> Start Grading Now ... </div>
                            </div>)}
                            <div style={style.btnGroup}>
                                <Button variant="contained" disabled={this.state.steps === 0} onClick={this.handleBack} style={{ width: '100px', marginRight: '30px' }}> Back </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext} style={{ width: '100px' }}>
                                    {this.state.steps < stepInstruction.length - 1 && 'Next'}
                                    {this.state.steps === stepInstruction.length - 1 && 'Finish'}
                                    {this.state.steps === stepInstruction.length && 'Close'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
export default CreatGrading;

