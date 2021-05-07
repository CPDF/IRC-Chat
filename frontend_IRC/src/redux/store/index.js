import { applyMiddleware, createStore } from "redux";
import rootReducer from './rootReducer'
import createSagaMiddleWare from 'redux-saga'
import RootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

export default store;