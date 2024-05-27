"use client"
import App from "../App";
import { Provider } from 'react-redux'
import store from '../globalState/store.js'

export default function RootPage() {
    return (
      
      <Provider store={store}>
        <App/>
      </Provider>
    )
}