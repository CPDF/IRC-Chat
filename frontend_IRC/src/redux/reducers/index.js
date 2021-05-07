import  { Map, fromJS } from 'immutable';
import types from '../constants/action-types'


const initialState = Map({
    searchResults: []
})

const SearchReducer = (state = initialState, action) => {
    //console.log("action: ", action.type)
    switch(action.type){
        case types.SET_SEARCH_RESULTS:{
            //console.log("Reducer: ", action)
            return state.merge({
                searchResults: fromJS(action.results)
            });
        }
        default: {
            return state;
        }
    }
}

export default SearchReducer
