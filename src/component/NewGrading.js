import React from 'react';
import { Button, Stepper, Step, StepLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { submission } from '../fakeResponce';
import history from '../history';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import D2L from '../D2L/valence';

class NewGrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: 0,
            selectCourse: null,
            selectDropbox: null,
            selectLanguage: null,
            coursesList: [],
            dropboxesList: [],
            testConfig: [{
                filename: '',
                testCases: [{
                    input: '',
                    output: '',
                    marks: 1,
                }]
            }],
            step0error: false,
            step1error: false,
            step2error: false,
            step3error: null,
        }
    }

    handleBack = () => {
        this.setState({ steps: this.state.steps - 1 });
    }

    handleNext = () => {
        if (this.state.steps === 0) {
            if (!this.state.selectCourse || !this.state.selectDropbox || !this.state.selectLanguage) {
                this.setState({ step0error: true });
            } else {
                this.setState({ step0error: false });
                this.setState({ steps: this.state.steps + 1 });
            }
        }
        else if (this.state.steps === 1) {
            for (let i = 0; i < this.state.testConfig.length; i++) {
                if (this.state.testConfig[i].filename === "") {
                    this.setState({ step1error: true });
                    return;
                }
            }
            this.setState({ step1error: false });
            this.setState({ steps: this.state.steps + 1 });

        }
        else if (this.state.steps === 2) {
            this.createJob();
            this.setState({ steps: this.state.steps + 1 });
        }
        else if (this.state.steps === 3) {
            history.push("/");
            window.location.reload();
        }
    }

    createJob = async () => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const body = {
            professorName: "Nina",
            professorId: "163045140",
            course: this.state.selectCourse.OrgUnit.Name,
            languageId: this.state.selectLanguage._id,
            orgUnitId: this.state.selectCourse.OrgUnit.Id,
            dropbox: this.state.selectDropbox.Name,
            folderId: this.state.selectDropbox.Id,
            configuration: this.state.testConfig,
        }
        const response = await axios.post(process.env.REACT_APP_API + '/job', body, { headers }).catch(function (error) {
            console.log(error);
            return 400;
        });
        if (response === 400) {
            this.setState({ step3error: true });
        } else {
            this.createGrading(body.orgUnitId, body.folderId, response.data);
        }
    }

    createGrading = async (orgUnitId, folderId, data) => {
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        const URL = D2LUserContext.createAuthenticatedUrl(`/d2l/api/le/1.10/${orgUnitId}/dropbox/folders/${folderId}/submissions/`, "get");
        const submission = (await axios.get(URL)).data;
        const grading = [];
        submission.map(sub => {
            let fileName1, fileId1;
            if (sub.Submissions.length === 0) {
                fileName1 = null;
                fileId1 = null;
            } else {
                const item = sub.Submissions[sub.Submissions.length - 1];
                fileName1 = item.Files.FileName;
                fileId1 = item.Files.FileId;
            }
            const item = {
                DisplayName: sub.Entity.DisplayName,
                EntityId: sub.Entity.EntityId,
                FileName: fileName1,
                fileId: fileId1,
                markings: this.configToResult(this.state.testConfig),
            }
            grading.push(item);
        })
        const body = {
            jobId: data._id,
            credential: {
                SessionId: "test",
                SessionKey: "test",
                SessionSkew: "test"
            },
            objects: grading,
            gradingId: data.gradingId,
        }
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const response = await axios.post(process.env.REACT_APP_API + '/grading', body, { headers }).catch(function (error) {
            console.log(error);
            return 400;
        });
        if (response === 400) {
            this.setState({ step3error: true });
        } else {
            this.updateCounts(grading.length, data._id, data.gradingId);
        }
    }

    configToResult = () => {
        let markingResult = [];
        this.state.testConfig.map(test => {
            let result = [];
            test.testCases.map(item => {
                const thing = {
                    output: '',
                    expectOutput: item.output,
                    marks: item.marks,
                }
                result.push(thing);
            });
            const item = {
                filename: test.filename,
                marked: false,
                testResult: result,
            }
            markingResult.push(item);
        });
        return markingResult;
    }

    updateCounts = async (count, jobId, gradingId) => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const body = {
            gradingId: gradingId,
            gradingCounts: 0,
            submissionCounts: count,
        }
        const response = await axios.put(process.env.REACT_APP_API + `/job?_id=${jobId}`, body, { headers }).catch(function (error) {
            console.log(error);
            return 400;
        });
        if (response === 400) {
            this.setState({ step3error: true });
        } else {
            this.setState({ step3error: false });
        }
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses = async () => {
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        const URL = D2LUserContext.createAuthenticatedUrl("/d2l/api/lp/1.10/enrollments/myenrollments/", "get");
        const data = (await axios.get(URL)).data;
        let list = [];
        data.Items.map((item) => {
            if (item['Access']['ClasslistRoleName'] === "Instructor") {
                list.push(item);
            }
        });
        this.setState({ coursesList: list });
        console.log(list);
    }

    getDropBoxs = async (orgUnitId) => {
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        const URL = D2LUserContext.createAuthenticatedUrl(`/d2l/api/le/1.10/${orgUnitId}/dropbox/folders/`, "get");
        const data = (await axios.get(URL)).data;
        this.setState({ dropboxesList: data });
        console.log(data);
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
    }

    outputOnchange = (index, i, newOutput) => {
        let config = this.state.testConfig;
        config[index].testCases[i].output = newOutput;
        this.setState({ testConfig: config });
    }

    marksOnchange = (index, i, newMarks) => {
        let config = this.state.testConfig;
        config[index].testCases[i].marks = newMarks;
        this.setState({ testConfig: config });
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
        let config = this.state.testConfig;
        config.splice(index, 1);
        this.setState({ testConfig: config });
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

    deleteCase = (index, i) => {
        let config = this.state.testConfig;
        config[index].testCases.splice(i, 1);
        this.setState({ testConfig: config });
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
                                <Select
                                    onChange={(e) => {
                                        this.setState({ selectCourse: e.target.value });
                                        this.getDropBoxs(e.target.value['OrgUnit']['Id']);
                                    }}
                                    style={{ width: '100%', marginBottom: '30px' }}>
                                    {this.state.coursesList.map(item => (<MenuItem value={item}>{item['OrgUnit']['Name']}</MenuItem>))}
                                </Select>
                                <br />
                                <div style={{ display: 'inline', marginRight: '20px' }}>Select Dropbox: </div>
                                <Select onChange={(e) => { this.setState({ selectDropbox: e.target.value }); }} style={{ width: '100%', marginBottom: '30px' }}>
                                    {this.state.dropboxesList.map(item => (<MenuItem value={item}>{item['Name']}</MenuItem>))}
                                </Select>
                                <div style={{ display: 'inline', marginRight: '20px' }}>Select Compiling Language: </div>
                                <Select onChange={(e) => { this.setState({ selectLanguage: e.target.value }); }} style={{ width: '100%', marginBottom: '30px' }}>
                                    {this.props.compilingLanguage.map(item => (<MenuItem value={item}>{item.name}</MenuItem>))}
                                </Select>
                                {this.state.step0error && (<div style={{ color: 'red', marginBottom: '10px' }}> Please select course and dropbox!</div>)}
                            </div>)}

                        {this.state.steps === 1 && (
                            <div>
                                {this.state.testConfig.map((test, index) => (
                                    <div>
                                        <div style={{ marginTop: '20px', display: 'inline', fontSize: '25px', color: 'Red' }}> Test {index + 1}:</div>
                                        <button onClick={() => this.deleteTest(index)}>delete Test</button>
                                        <br />
                                        <div style={{ display: 'inline-block', marginTop: '20px' }}>Testing File Name</div>
                                        <TextField style={{ marginLeft: '20px', marginTop: '0px', width: 'calc(100% - 200px)' }} required label="Required" value={test.filename} onChange={(e) => this.filenameOnchange(index, e.target.value)} />
                                        {test.testCases.map((item, i) => (
                                            <div style={{ marginTop: '20px' }}>
                                                <div style={{ marginTop: '20px', display: 'inline' }}> Case {i + 1}:</div>
                                                <button onClick={() => this.deleteCase(index, i)}>delete case</button>
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
                                                <TextField value={item.marks} style={{ marginTop: '10px', marginLeft: '20px', textAlign: 'center' }} type='number' onChange={(e) => this.marksOnchange(index, i, parseInt(e.target.value))} />
                                            </div>
                                        ))}
                                        <button onClick={() => this.addCase(index)}>add case</button>
                                    </div>
                                ))}
                                <button onClick={this.addTest}>add test</button>
                                {this.state.step1error && (<div style={{ color: 'red', marginBottom: '10px' }}> At lease one of the testing file name is empty!</div>)}
                            </div>)}

                        {this.state.steps === 2 && (
                            <div>
                                <div style={{ marginBottom: '10px' }}> Creat a new assignment grading for <b>{this.state.selectCourse.OrgUnit.Name}</b> - <b>{this.state.selectDropbox.Name}</b></div>
                                <div style={{ marginBottom: '10px' }}> Compiling Language: <b>{this.state.selectLanguage.name}</b></div>
                                <div style={{ marginBottom: '10px' }}> Language Version: <b>{this.state.selectLanguage.version}</b></div>
                                {this.state.testConfig.map((test, index) => (
                                    <>
                                        <div> Test {index + 1}:</div>
                                        <div> Test File Name: {test.filename}</div>
                                        <React.Fragment style={{ width: '100%' }}>
                                            <TableRow>
                                                <TableCell>Case Number</TableCell>
                                                <TableCell>Case Input</TableCell>
                                                <TableCell>Expect output</TableCell>
                                                <TableCell>Marks Worth</TableCell>
                                            </TableRow>
                                            {test.testCases.map((item, i) => (
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell>{item.input}</TableCell>
                                                    <TableCell>{item.output}</TableCell>
                                                    <TableCell>{item.marks}</TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    </>
                                ))}
                            </div>)}

                        {this.state.steps === 3 && (
                            <div>
                                <div style={{ marginBottom: '10px' }}> Creating Grading Now.</div>
                                <div> Please Wait... </div>
                            </div>)}

                        <div style={style.btnGroup}>
                            <Button variant="contained" disabled={this.state.steps === 0} onClick={this.handleBack} style={{ width: '100px', marginRight: '30px' }}> Back </Button>
                            <Button variant="contained" color="primary" onClick={this.handleNext} style={{ width: '100px' }}>
                                {this.state.steps < stepInstruction.length - 1 && 'Next'}
                                {this.state.steps === stepInstruction.length - 1 && 'Finish'}
                                {this.state.steps === stepInstruction.length && 'Close'}
                            </Button>
                        </div>
                        <Dialog open={this.state.step3error}>
                            <DialogTitle>Oops! Something went wrong.</DialogTitle>
                            <div>Failed at creating grading assginment, Please try it later!. </div>
                            <Button color="primary" variant="contained" onClick={() => { this.setState({ step3error: null }); }}>Ok</Button>
                        </Dialog>
                        <Dialog open={this.state.step3error === false}>
                            <DialogTitle>Grading assginment created!</DialogTitle>
                            <div>Our machine will start marking this assginment, you could go back to Home page to see the progress. </div>
                            <Button color="primary" variant="contained" onClick={() => { this.setState({ step3error: null }); }}>Ok</Button>
                        </Dialog>
                    </div>
                </div>
            </>);
    }
}

const mapStateToProps = (state) => ({
    compilingLanguage: state.compilingLanguage,
});

export default connect(mapStateToProps)(NewGrading);