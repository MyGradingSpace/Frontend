import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from '../history';
import NavBar from './NavBar';
import CreateGrading from './CreateGrading';
import Outline from './Outline';
import Home from './Home';

class App extends React.Component {

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
        minHeight:'90vh',
      }
    }

    return (
      <div>
        <NavBar />
        <div style={style.body}>
          <div style={style.content}>
            <BrowserRouter history={history}>
              <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/plans" exact component={NavBar} />
                <Route path="/edit-plans" exact component={NavBar} /> */}
              </Switch>
            </BrowserRouter>
          </div>
          <div></div>
          <div>
            <CreateGrading />
            <Outline />
          </div>
        </div>
      </div >
    );
  }

}

export default App;
