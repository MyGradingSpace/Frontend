import React from 'react';
import TablePage from './TablePage'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GradingStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null,
        }
    }

    componentDidMount = () => {
        const job = this.props.jobs.find(job => {
            if (job._id === this.props.selectJob.jobId) return job;
        });
        this.setState({ job: job });
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
                // float:'right',
                backgroundColor: '#F2A900',
                fontSize: '15px',
                color: 'white',
                padding: '10px 50px'

            }
        }
        return (
            <div style={style.body}>
                <div style={style.title}>Course:</div> <a>{this.state.job ? this.state.job.course:""}</a>
                <div style={style.title}>Dropbox:</div> <a>{this.state.job ? this.state.job.dropbox :""}</a>
                <div style={style.title}>Grading Status:</div> <a>{this.state.job ? this.state.job.gradingCounts :""}/{this.state.job ? this.state.job.submissionCounts :""}</a>
                <TablePage />
                <Button style={style.btn}>Publish this assignment</Button>
            </div>
        );
    }
}


GradingStatus.propTypes = {
};

const mapStateToProps = (state) => ({
    jobs: state.jobs,
    selectJob: state.selectJob[0],
});

export default connect(mapStateToProps)(GradingStatus);
