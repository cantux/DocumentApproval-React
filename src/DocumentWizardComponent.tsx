import * as React from "react";

import { ErrorComponent } from "./ErrorComponent";

// import * as rpn from 'request-promise-native';

// Types
import { match } from 'react-router-dom';
interface NavParam {
    documentId: number;
}
interface DocumentWizardProps {
    match: match<NavParam>;
    history: any;
}
interface DocumentWizardState {
    checked: boolean;
    isValid: boolean;
}
// End of Types

export class DocumentWizardComponent extends React.Component<DocumentWizardProps, DocumentWizardState>{
    constructor(props: DocumentWizardProps) {
        super(props);
        this.state = {checked: false, isValid: false};
    }

    componentWillMount () {
        setTimeout(() => {
            this.setState({ isValid: true });
            const route = "/wiz/" + this.props.match.params.documentId + "/node/" + 0;
            this.props.history.push(route);

        }, 250);

        // rpn({
        //     uri: "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=123",
        //     method: 'GET',
        //     json: true
        // }).then((response: any) => (console.log("hello: ", response.json()))).catch((err) => console.log(err));

    }

    public render (): JSX.Element {

        return (
            <div>
                {
                    this.state.isValid ?
                        <div>
                            Redirecting...
                        </div>
                        :
                        <ErrorComponent message={'Geçersiz döküman referans numarasi.!!'}/>
                }
            </div>

        );

    }
}
