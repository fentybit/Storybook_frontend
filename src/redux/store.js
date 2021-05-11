import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';
import eventReducer from './reducers/eventReducer';
import errorReducer from './reducers/errorReducer';
import tokenReducer from './reducers/tokenReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    event: eventReducer,
    error: errorReducer,
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