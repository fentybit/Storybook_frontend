import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';
import categoriesReducer from './reducers/categoriesReducer';
import eventReducer from './reducers/eventReducer';
import eventsReducer from './reducers/eventsReducer';
import errorReducer from './reducers/errorReducer';
import imagesReducer from './reducers/imagesReducer';
import tokenReducer from './reducers/tokenReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    categories: categoriesReducer,
    event: eventReducer,
    events: eventsReducer,
    error: errorReducer,
    images: imagesReducer,
    token: tokenReducer,
    user: userReducer
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;