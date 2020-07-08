import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { loadState, saveState} from './reducers/localStorage';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
    saveState({
        loginInformation: store.getState().loginInformation,
        login: store.getState().login,
        compilingLanguage: store.getState().compilingLanguage,
        jobs: store.getState().jobs,
        selectJob: store.getState().selectJob,
    });
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
