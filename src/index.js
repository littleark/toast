import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker'
import toastApp from './reducers'

import './index.css'
import './fonts.css'

import {data} from './components/Scene/config'
import {calculateStatuses} from './lib/data'
import App from './App'


let store = createStore(toastApp,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({
  type: 'INITIALIZE',
  data: data,
  statuses: calculateStatuses(data)
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
