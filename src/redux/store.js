import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import tokenReducer from './reducers/tokenReducer';
import errorReducer from './reducers/errorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    error: errorReducer
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;