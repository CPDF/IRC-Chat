import Main from './Components/Main'
import { Provider } from 'react-redux'
import store from './redux/store/index'


import './App.css'


export default function App(){

  return(
    <Provider store= { store }>
    <Main/>
    </Provider>
  )

}