import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import {RoomProvider} from './Context'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <RoomProvider>
        <Router>
            <App appname="React Tutorial: A Beach Resort"/>
        </Router>
    </RoomProvider>,
    document.getElementById('root')
)

serviceWorker.unregister()