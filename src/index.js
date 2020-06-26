import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadState, saveState} from './reducers/localStorage';
import reducers from './reducers';

const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState
);

store.subscribe(() => {
    saveState({
        loginInformation: store.getState().loginInformation,
        login: store.getState().login,
    });
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
