import types from '../constants/action-types'

export const getSearchResults = value => ({
    type: types.WATCH_GET_SEARCH_RESULTS,
    value
})

export const setSearchResult = results => ({
    type: types.SET_SEARCH_RESULTS,
    results
})
