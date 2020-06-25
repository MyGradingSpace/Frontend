import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from '../history';
import NavBar from './NavBar';


class App extends React.Component {


  
  render() {
    const style = {
      app: {
        fontFamily: "'Roboto', sans-serif",
      }
    }
    
    return (
      <div style={style.app}>
        <BrowserRouter history={history}>
           <Switch>
            <Route path="/" exact component={NavBar} />
            <Route path="/plans" exact component={NavBar} />
            <Route path="/edit-plans" exact component={NavBar} />
          </Switch> 
        </BrowserRouter>
      </div >
    );
  }

}

export default App;
