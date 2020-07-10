import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from '../history';
import NavBar from './NavBar';
import CreateGrading from './CreateGrading';
import Outline from './Outline';
import Home from './Home';
import NewGrading from './NewGrading';
import GradingStatus from './GradingStatus';
import Login from './Login';
import { getCompilingLanguage, getJobs } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {

  componentDidMount = async () => {
    await this.props.dispatch(getCompilingLanguage());
    await this.props.dispatch(getJobs("163045140"));
  }

  render() {
    const style = {
      body: {
        display: 'grid',
        width: '90%',
        margin: 'auto',
        marginTop: '10px',
        gridTemplateColumns: '69% 1% 30%',
      },
      content: {
        backgroundColor: 'white',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        minHeight: '90vh',
      }
    }

    return (
      <>
        {this.props.login && (
          <>
            <NavBar />
            <div style={style.body}>
              <div style={style.content}>
                <BrowserRouter history={history}>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/status" exact component={GradingStatus} />
                    <Route path="/new-grading" exact component={NewGrading} />
                  </Switch>
                </BrowserRouter>
              </div>
              <div></div>
              <div>
                <CreateGrading />
                <Outline />
              </div>
            </div>
          </>)}
        {!this.props.login && (
          <>
            <BrowserRouter history={history}>
              <Switch>
                <Route path="/" exact component={Login} />
              </Switch>
            </BrowserRouter>
          </>)}
      </>
    );
  }

}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setLoginInformation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(App);

