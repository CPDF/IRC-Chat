import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import index from "./redux/index";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2EFF22"
    },
    secondary: { main: "#22BF19" },
    grey: { main: "#22BF19" }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "#2EFF22"
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#2EFF22",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#2EFF22"
          }
        },
        "&$focused $notchedOutline": {
          borderColor: "#2EFF22",
          borderWidth: 1
        },
      }
    },
    MuiFormLabel: {
      root: {
        // "&$focused": {
        color: "#2EFF22"
        // }
      }
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
