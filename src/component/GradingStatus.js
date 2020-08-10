import React from 'react';
import TablePage from './TablePage'
import { Button, Dialog } from '@material-ui/core'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import D2L from '../D2L/valence';
import axios from 'axios';
import history from '../history';
import Service from '../service/service';

class GradingStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null,
            count: 0,
            total: this.props.markingResult.length,
            error: [],
            dialogOpen: false,
            finish: false,
        }
        this.service = new Service();
    }

    componentDidMount = () => {
        const job = this.props.jobs.find(job => {
            if (job._id === this.props.selectGrading.jobId) return job;
        });
        this.setState({ job: job });
    }

    publishGrading = async () => {
        this.setState({ dialogOpen: true });
        const job = await this.props.selectJob;
        const userContext = await this.props.userContext;
        const grading = await this.props.markingResult;

        const orgUnitId = job.orgUnitId;
        const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
        const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, userContext.xA, userContext.xB);
        const folderId = job.folderId;
        grading.map(async (grade) => {
            const entityId = grade.EntityId;
            const feedbackURL = D2LUserContext.createAuthenticatedUrl(`/d2l/api/le/1.10/${orgUnitId}/dropbox/folders/${folderId}/feedback/user/${entityId}`, "post");
            const body2 = {
                Score: grade.marks,
                Feedback: {
                    Text: this.makeDetailsReadable(grade.details),
                    Html: null
                },
                RubricAssessments: [],
                IsGraded: true,
                GradedSymbol: null
            }
            const data2 = await axios.post(feedbackURL, body2);
            this.setState({ count: this.state.count + 1 });
            if (data2.status !== 200) {
                const list = this.state.error;
                list.push(grade.DisplayName);
                this.setState({ error: list });
            }
        })
        this.setState({ dialogOpen: false });
        this.setState({ finish: true });
    }

    makeDetailsReadable = (details) => {
        let feedback = "";
        for (let i = 0; i < details.length; i++){
            feedback += "File Name: "+ details[i].fileName + ", ";
            feedback += "Case Number: "+ details[i].case + ", ";
            feedback += "Output: "+ details[i].output + ", ";
            feedback += "Expect Output: "+ details[i].expectOutput + ", ";
            feedback += "Result: "+ details[i].result + "; ";
            feedback += "\n";
        }
        return feedback;
    }

    close = async () => {
        this.setState({ finish: false });
        if (this.state.error.length === 0) {
            const job = await this.props.selectJob;
            await this.service.deleteJob(job.gradingId);
            history.push("/");
            window.location.reload();
        }
    }

    render() {
        const style = {
            body: {
                padding: '20px 40px'
            },
            title: {
                fontSize: '20px',
                textTransform: 'uppercase',
                color: '#330072',
                display: 'inline',
                marginLeft: '20px',
            },
            btn: {
                backgroundColor: '#F2A900',
                fontSize: '15px',
                color: 'white',
                padding: '10px 50px'
            },
            btn2: {
                float: 'right',
                backgroundColor: '#330072',
                fontSize: '15px',
                color: 'white',
                padding: '10px 50px'
            }
        }
        return (
            <div style={style.body}>
                <div style={style.title}>Course:</div> <a>{this.state.job ? this.state.job.course : ""}</a>
                <div style={style.title}>Dropbox:</div> <a>{this.state.job ? this.state.job.dropbox : ""}</a>
                <div style={style.title}>Grading Status:</div> <a>{this.state.job ? this.state.job.gradingCounts : ""}/{this.state.job ? this.state.job.submissionCounts : ""}</a>
                <TablePage />
                <Button style={style.btn} onClick={this.publishGrading}>Publish this assignment</Button>
                <Dialog open={this.state.dialogOpen}>
                    <div style={{ padding: '50px 50px' }}>
                        <div style={{ fontSize: '25px', color: '#330072' }}>Uploading Marks Right Now...</div>
                        <div>Uploaded: {this.state.count}/{this.state.total}</div>
                    </div>
                </Dialog>
                <Dialog open={this.state.finish}>
                    <div style={{ padding: '50px 50px' }}>
                        <div style={{ fontSize: '25px', color: '#330072' }}>Grades Upload Completed!</div>
                        {this.state.error.length === 0 && (<div>Success Uploaded All Students Grades !</div>)}
                        {this.state.error.length !== 0 && (<div>Failed to upload those students: <br />{this.state.error.map(name => (<b>{name}<br /></b>))}</div>)}
                        <Button style={style.btn2} onClick={this.close}> Close</Button>
                    </div>
                </Dialog>
            </div>
        );
    }
}


GradingStatus.propTypes = {
};

const mapStateToProps = (state) => ({
    jobs: state.jobs,
    selectJob: state.selectJob,
    selectGrading: state.selectGrading[0],
    userContext: state.userContext,
    markingResult: state.markingResult,
});

export default connect(mapStateToProps)(GradingStatus);
