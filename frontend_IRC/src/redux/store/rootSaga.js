import { fork, all } from 'redux-saga/effects'
import SearchSaga from '../Middlewares/SearchSaga'

function* RootSaga(){
    yield all([
        fork(SearchSaga)
    ])
}

export default RootSaga