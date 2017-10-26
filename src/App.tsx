
import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import {FormComponent} from './FormComponent';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

interface AppProps {};
interface AppState {isValid:boolean};

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {isValid: false};
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Kredi Alma Formu</h2>
                </div>
                <Router>
                    <div className="App-intro">
                        <Route path="/form/:id" component={FormComponent}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
