import { useState } from 'react'
import './App.css'
import SelectMusic from './selectMusic'
import store from '../redux/store';
import { Provider } from 'react-redux';
import Game from './Game';

function App() {

  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  )
}
export default App
