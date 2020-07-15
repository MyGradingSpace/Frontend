import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CachedIcon from '@material-ui/icons/Cached';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';
import { selectJob } from '../actions';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    toGradingPage = async (id) => {
        await this.props.dispatch(selectJob(id));
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
                    {this.props.jobs.map(job => (
                        <div>
                            {job.submissionCounts === job.gradingCounts && job.submissionCounts != 0 && (<>
                                <div style={{ textTransform: 'uppercase', color: 'green', fontSize: '20px', marginBottom: '10px', marginTop: '20px' }}>Unpublished Assignment</div>
                                <CheckCircleOutlineIcon style={{ color: 'green', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} /></>)}
                            {job.submissionCounts === 0 && (<>
                                <div style={{ textTransform: 'uppercase', color: 'red', fontSize: '20px', marginBottom: '10px', marginTop: '20px' }}>Creating Assignment</div>
                                <AddCircleOutlineIcon style={{ color: 'red', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} /></>)}
                            {job.submissionCounts != job.gradingCounts && (<>
                                <div style={{ textTransform: 'uppercase', color: 'orange', fontSize: '20px', marginBottom: '10px', marginTop: '20px' }}>Current Grading Assignment</div>
                                <CachedIcon style={{ color: 'orange', position: 'absolute', transform: 'translate(5px, 10px)', fontSize: '35px' }} /></>)}
                            <div style={{ marginLeft: '50px' }}>
                                <div>Course: <b>{job.course}</b></div>
                                <div>DropBox: <b>{job.dropbox}</b></div>
                                <div>Grading: <b>{job.gradingCounts}/{job.submissionCounts}</b></div>
                            </div>
                            <Button disabled={job.submissionCounts === 0} style={{ backgroundColor: '#330072', color: 'white', fontSize: '14px', marginTop: '20px', marginBottom: '30px' }} onClick={() => this.toGradingPage(job._id)}>View Grading Result</Button>
                        </div>
                    ))}
                </div>
            </div >

        )
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    jobs: state.jobs,
});

export default connect(mapStateToProps)(Home);