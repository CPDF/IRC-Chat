import types from '../constants/action-types'
import { takeLatest, put, call } from 'redux-saga/effects'
import { setSearchResult } from '../actions/index'
import axios from 'axios'

function* setSearch({ value }){
    try{
        console.log("API: ", process.env.REACT_APP_API_KEY)
        const url = `${ process.env.REACT_APP_API_KEY+value }&limit=25&offset=0&rating=g&lang=en`
        //const url = `https://api.giphy.com/v1/gifs/search?api_key=RsJw8RxzJn1gJERcZS2NqyqgGmI8ENsw&q=dogs&limit=25&offset=0&rating=g&lang=en`
        const data = yield axios.get(url)
        //console.log("Saga search: ", data.data.data)
        //console.log("ENVIRONMENT: ", process.env.REACT_APP_API_KEY)
        return yield put(setSearchResult(data.data.data))
    } catch(e){
        console.log(e)
    }

}

function* watchSearch(){
    yield takeLatest(types.WATCH_GET_SEARCH_RESULTS, setSearch)

}

export default watchSearch;