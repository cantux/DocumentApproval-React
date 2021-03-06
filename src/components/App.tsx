import * as React from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { FormComponent } from './form/FormComponent';
import { DocumentsTableComponent } from './table/DocumentsTableComponent';
import { DocumentWizardComponent } from './wizard/DocumentWizardComponent';
import { DocumentWizardNodeComponent } from './wizard/DocumentWizardNodeComponent';
import { UnrolledListComponent } from './unrolled/UnrolledListComponent';
import { AccordionRedirectorComponent } from './accordion/AccordionRedirectorComponent';
import { AccordionListComponent } from './accordion/AccordionListComponent';
import { ReferenceCodeComponent } from './common/ReferenceCodeComponent';
import { ErrorBoundary } from "./common/ErrorBoundry";
import { ErrorComponent } from "./common/ErrorComponent";

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
            width: '230px',
            height: '50px',
            maxWidth: '100%',
            padding: 0
        } as React.CSSProperties;
        // noinspection TsLint
        return (

            <div className="App">
                <div className="App-header" id="app-header">
                    <div className="ui-g">
                        <div className="ui-g-12">
                            <img src={logo} style={logoStyle}/>
                        </div>
                        <div className="ui-g-12">
                            <h2>Doküman Onay</h2>
                        </div>
                    </div>
                </div>
                <ErrorBoundary>
                    <Router basename={process.env.PUBLIC_URL}>
                        <div className="App-intro">
                            <Switch>
                              <Route path="/form/:referralId" component={FormComponent}/>
                              <Route path="/table/:referralId" component={DocumentsTableComponent}/>
                              <Route exact path="/wiz/:referralId" component={DocumentWizardComponent}/>
                              <Route exact path="/wiz/:referralId/node/:nodeId" component={DocumentWizardNodeComponent}/>
                              <Route path="/pdf/:referralId/node/:nodeId" component={UnrolledListComponent}/>
                              <Route exact path="/accor/:referralId" component={AccordionRedirectorComponent}/>
                              <Route path="/accor/:referralId/node/:nodeId" component={AccordionListComponent}/>
                              <Route path="/referenceCode" component={ReferenceCodeComponent}/>
                              <Route render={() => (<ErrorComponent message="Hatalı Link!!"/>)}/>
                            </Switch>
                        </div>
                    </Router>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
