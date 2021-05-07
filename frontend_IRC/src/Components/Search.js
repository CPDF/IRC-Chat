import React from 'react'
import { connect } from 'react-redux'
import { getSearchResults } from '../redux/actions/index'
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

async function onInputChange(e, props){
    if(e.target.value.trim()!==''){
        props.getSearchResults(e.target.value)
    }
    
}

const useStyles = theme => ({
    greentext:{
      color:'#2EFF22'
    }
  });

function Search(props){
    //console.log("PROPS: ", props)
    const { classes } = props;
    return(
        <div>
            <TextField
                id="outlined-helperText"
                label="Search gif"
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={e => {onInputChange(e, props)
                }}
              />
        </div>
    )

}

const mapDispatchToProps = {
    getSearchResults
}

export default connect(null, mapDispatchToProps)(Search);