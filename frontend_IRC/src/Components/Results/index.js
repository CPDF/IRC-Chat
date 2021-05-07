import React from 'react'
import Result from './Result'
import { connect } from 'react-redux'

function Results(props){
    console.log("PROPSRESULTS: ", props.roomName)
    if(props.searchResults){
        return(
            <>
            { renderSearchResults(props.searchResults, props.roomName) }
            </>
        )
    }

    return null
}

const renderSearchResults = (searchResults, props) => {
    return searchResults.map((result, i) => {
        return <Result i={i} result={ result } roomName={ props }/>
    })
}

const mapStateToProps = state => {
    return {
        searchResults: state.search.get('searchResults')
    }
}

export default connect(mapStateToProps)(Results)