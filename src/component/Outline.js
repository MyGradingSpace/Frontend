import React from 'react';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';
import { selectJob, selectGrading } from '../actions';

class Outline extends React.Component {

    constructor(props) {
        super(props);
    }

    goToStatusPage = async (job) => {
        await this.props.dispatch(selectJob(job));
        await this.props.dispatch(selectGrading(job._id));
        history.push("/status");
        window.location.reload();
    }

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
                marginTop: '-5px',
            },
        }

        const gradingJobs = [];
        const unpublishedJobs = [];

        this.props.jobs.map(job => {
            if (job.submissionCounts === job.gradingCounts && job.submissionCounts != 0) {
                unpublishedJobs.push(job);
            } else if (job.submissionCounts != job.gradingCounts && job.submissionCounts != 0) {
                gradingJobs.push(job);
            }
        });
        return (
            <div style={style.body}>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <div>Current Grading Assignments: <a style={{ color: 'red', fontWeight: 'bold' }}> {gradingJobs.length}</a></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ marginLeft: '5%', width: '90%' }}>
                            {gradingJobs.map(job => (
                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <div style={{ display: 'inline' }}>{job.course} - {job.dropbox} </div>
                                    <Button style={style.btn} onClick={() => { this.goToStatusPage(job) }}> Details</Button>
                                </div>
                            ))}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <div>Unpublished Assignments: <a style={{ color: 'green', fontWeight: 'bold' }}>{unpublishedJobs.length}</a></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ marginLeft: '5%', width: '90%' }}>
                            {unpublishedJobs.map(job => (
                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <div style={{ display: 'inline' }}>{job.course} - {job.dropbox} </div>
                                    <Button style={style.btn} onClick={() => { this.goToStatusPage(job) }}> Details</Button>
                                </div>
                            ))}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

Outline.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: state.jobs,
});

export default connect(mapStateToProps)(Outline);
