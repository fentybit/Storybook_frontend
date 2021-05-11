import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import errorReducer from './reducers/errorReducer';
import formReducer from './reducers/formReducer';
import tokenReducer from './reducers/tokenReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    error: errorReducer,
    form: formReducer,
    token: tokenReducer,
    user: userReducer
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;