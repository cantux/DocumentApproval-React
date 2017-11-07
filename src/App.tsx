
import * as React from 'react';
import './App.css';
import 'pdfjs-dist';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FormComponent } from './FormComponent';
import { DocumentsTableComponent } from './DocumentsTableComponent';
import { DocumentWizardComponent } from "./DocumentWizardComponent";
import { DocumentWizardNodeComponent } from "./DocumentWizardNodeComponent";
import {PdfListComponent} from "./PdfListComponent";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';


interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        console.log('env: ', process.env);
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Döküman Onay</h2>
                </div>
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="App-intro">
                        <Route path="/form/:documentId" component={FormComponent}/>
                        <Route path="/table/:documentId" component={DocumentsTableComponent}/>
                        <Route exact path="/wiz/:documentId" component={DocumentWizardComponent}/>
                        <Route exact path="/wiz/:documentId/node/:nodeId" component={DocumentWizardNodeComponent}/>
                        <Route path="/pdf" component={PdfListComponent}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
