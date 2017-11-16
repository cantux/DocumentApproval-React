
import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FormComponent } from './form/FormComponent';
import { DocumentsTableComponent } from './table/DocumentsTableComponent';
import { DocumentWizardComponent } from "./wizard/DocumentWizardComponent";
import { DocumentWizardNodeComponent } from "./wizard/DocumentWizardNodeComponent";
import { UnrolledListComponent } from "./unrolled/UnrolledListComponent";
import { AccordionRedirectorComponent } from "./accordion/AccordionRedirectorComponent";
import { AccordionListComponent} from "./accordion/AccordionListComponent";
import {ReferenceCodeComponent} from "./common/ReferenceCodeComponent";

const logo = require('../assets/images/fibabanka_logo.png');

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
        const logoStyle = {
            width: "230px",
            height: "50px",
            maxWidth: "100%",
            padding:0
        } as React.CSSProperties;
        return (
            <div className="App">
                <div className="App-header" id="app-header">
                    <div className="ui-g">
                        <div className="ui-g-12">
                            <img src={logo} style={logoStyle}/>
                        </div>
                        <div className="ui-g-12">
                            <h2>Döküman Onay</h2>
                        </div>
                    </div>
                </div>
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="App-intro">
                        <Route path="/form/:documentId" component={FormComponent}/>
                        <Route path="/table/:documentId" component={DocumentsTableComponent}/>
                        <Route exact path="/wiz/:documentId" component={DocumentWizardComponent}/>
                        <Route exact path="/wiz/:documentId/node/:nodeId" component={DocumentWizardNodeComponent}/>
                        <Route path="/pdf/:documentId/node/:nodeId" component={UnrolledListComponent}/>
                        <Route exact path="/accor/:documentId" component={AccordionRedirectorComponent}/>
                        <Route path="/accor/:documentId/node/:nodeId" component={AccordionListComponent}/>
                        <Route path="/ref/:ref" component={ReferenceCodeComponent}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
