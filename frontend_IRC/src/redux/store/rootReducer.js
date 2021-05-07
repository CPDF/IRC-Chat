import { combineReducers } from 'redux'
import SearchReducer from '../reducers/index'

export default combineReducers({
    search: SearchReducer
})