import {createStore, applyMiddleware} from 'redux';
import thunkMiddlewear from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddlewear,
        loggerMiddleware
    )
);