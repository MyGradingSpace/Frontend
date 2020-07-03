import React from 'react';
import { Button, Stepper, Step, StepLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { erollments, dropbox } from '../fakeResponce';

class NewGrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: 1,
            selectCourse: "",
            selectDropbox: "",
            coursesList: [],
            dropboxesList: [],
            testConfig: [{
                filename: "",
                testCases: [{
                    input: '',
                    output: '',
                    marks: 1,
                }]
            }],
        }
    }

    handleBack = () => {
        this.setState({ steps: this.state.steps - 1 });
    }

    handleNext = () => {
        if (this.state.steps === 3) {
            this.closeDialog();
        } else {
            this.setState({ steps: this.state.steps + 1 });
        }
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses = async () => {
        // const headers = {
        //     'content-Type': 'application/json',
        //     'Accept': '*/*',
        //     'Cache-Control': 'no-cache',
        //     'Access-Control-Allow-Headers': "*",
        // }
        // axios.get('https://mylearningspace.wlu.ca/d2l/api/lp/1.10/enrollments/myenrollments/', {headers})
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        let list = [];
        erollments['Items'].map((item) => {
            if (item['Access']['StartDate'] && item['Access']['EndDate']) {
                list.push(item);
            }
        });
        this.setState({ coursesList: list });
    }

    getDropBoxs = async (orgUnitId) => {
        // const headers = {
        //     'content-Type': 'application/json',
        //     'Accept': '*/*',
        //     'Cache-Control': 'no-cache',
        //     'Access-Control-Allow-Headers': "*",
        // }
        // axios.get('https://mylearningspace.wlu.ca/d2l/api/le/1.34/338564/dropbox/folders/', {headers})
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        console.log(orgUnitId);
        let list = [];
        dropbox.map((item) => {
            if (item['CategoryId'] === 10254) {
                list.push(item);
                console.log(item);
            }
        });
        this.setState({ dropboxesList: list });
    }

    filenameOnchange = (index, newFilename) => {
        let config = this.state.testConfig;
        config[index].filename = newFilename;
        this.setState({ testConfig: config });
    }

    inputOnchange = (index, i, newInput) => {
        let config = this.state.testConfig;
        config[index].testCases[i].input = newInput;
        this.setState({ testConfig: config });
        console.log(config);
    }

    outputOnchange = (index, i, newOutput) => {
        let config = this.state.testConfig;
        config[index].testCases[i].output = newOutput;
        this.setState({ testConfig: config });
        console.log(config);
    }

    marksOnchange = (index, i, newMarks) => {
        let config = this.state.testConfig;
        config[index].testCases[i].marks = newMarks;
        this.setState({ testConfig: config });
        console.log(config);
    }

    addTest = () => {
        const newTest = {
            filename: "",
            testCases: [{
                input: '',
                output: '',
                marks: 1,
            }]
        };
        let config = this.state.testConfig;
        config.push(newTest);
        this.setState({ testConfig: config });
    }

    deleteTest = (index) => {

    }

    addCase = (index) => {
        const newCase = {
            input: '',
            output: '',
            marks: 1,
        };
        let config = this.state.testConfig;
        config[index].testCases.push(newCase);
        this.setState({ testConfig: config });
    }

    deleteCase = (index) => {

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
            content: {
                width: '80%',
                margin: 'auto',
                padding: '60px 0px'
            },
            btnGroup: {

            },


        }
        const stepInstruction = ['Select Course and Dropbox', 'Update Test and Answer Files', 'Veiw All'];
        return (
            <>
                <div style={style.content}>
                    <Stepper activeStep={this.state.steps} alternativeLabel>
                        {stepInstruction.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div style={{ marginTop: '50px' }}>
                        {this.state.steps === 0 && (
                            <div>
                                <div style={{ display: 'inline', marginRight: '20px', marginBottom: '30px' }}>Select Course: </div>
                                <Select onChange={(e) => { this.setState({ selectCourse: e.target.value }); this.getDropBoxs(e.target.value['OrgUnit']['Id']); }} style={{ width: '100%', marginBottom: '30px' }}>
                                    {this.state.coursesList.map(item => (<MenuItem value={item}>{item['OrgUnit']['Name']}</MenuItem>))}
                                </Select>
                                <br />
                                <div style={{ display: 'inline', marginRight: '20px' }}>Select Dropbox: </div>
                                <Select onChange={(e) => { this.setState({ selectDropbox: e.target.value }) }} style={{ width: '100%', marginBottom: '30px' }}>
                                    {this.state.dropboxesList.map(item => (<MenuItem value={item}>{item['Name']}</MenuItem>))}
                                </Select>
                            </div>)}

                        {this.state.steps === 1 && (
                            <div>
                                {this.state.testConfig.map((test, index) => (
                                    <div>
                                        <div style={{ display: 'inline-block', marginTop: '20px' }}>Testing File Name</div>
                                        <TextField style={{ marginLeft: '20px', marginTop: '0px', width: 'calc(100% - 200px)' }} required label="Required" value={test.filename} onChange={(e) => this.filenameOnchange(index, e.target.value)} />
                                        {test.testCases.map((item, i) => (
                                            <div>
                                                <div style={{ marginTop: '10px' }}> Case {i + 1}:</div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', marginTop: '10px' }}>
                                                    <div>
                                                        <div>User Input:</div>
                                                        <TextField multiline rows={2} style={{ width: '90%' }} value={item.input} onChange={(e) => this.inputOnchange(index, i, e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <div>Expect Output:</div>
                                                        <TextField multiline rows={2} style={{ width: '90%' }} value={item.output} onChange={(e) => this.outputOnchange(index, i, e.target.value)} />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '15px', display: 'inline-block' }}>Marks Worth:</div>
                                                <TextField value={item.marks} style={{ marginTop: '10px', marginLeft: '20px', textAlign: 'center' }} type='number' onChange={(e) => this.marksOnchange(index, i, e.target.value.t)} />
                                            </div>
                                        ))}
                                        <button onClick={() => this.addCase(0)}>add case</button>
                                    </div>
                                ))}
                                <button onClick={this.addTest}>add test</button>
                            </div>)}

                        {this.state.steps === 2 && (
                            <div>
                                <div style={{ marginBottom: '10px' }}> Creat a new assignment grading for <b>CP493</b> - <b>Dropbox1</b></div>
                                <div> Case1:  Test File: Answer File:</div>
                                <div> Case2:  Test File: Answer File:</div>
                                <div> Case3:  Test File: Answer File:</div>
                            </div>)}

                        {this.state.steps === 3 && (
                            <div>
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
            </>);
    }
}

export default NewGrading;