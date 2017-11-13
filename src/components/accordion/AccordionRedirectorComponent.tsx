import * as React from "react";

import { ErrorComponent } from "../common/ErrorComponent";

import * as rpn from 'request-promise-native';

// Types
import { match } from 'react-router-dom';
interface NavParam {
    documentId: number;
}
interface AccordionRedirectorProps {
    match: match<NavParam>;
    history: any;
}
interface AccordionRedirectorState {
    isValid: boolean;
}
// End of Types

export class AccordionRedirectorComponent extends React.Component<AccordionRedirectorProps, AccordionRedirectorState>{
    constructor(props: AccordionRedirectorProps) {
        super(props);
        this.state = {isValid: false};
    }

    componentWillMount () {
        // setTimeout(() => {
        //     this.setState({ isValid: true });
        //     const route = "/accor/" + this.props.match.params.documentId + "/node/" + 0;
        //     this.props.history.push(route);
        //
        // }, 250);

        rpn({
            uri: `https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=${this.props.match.params.documentId}`,
            method: 'GET',
            json: true
        }).then((response: any) => {
            this.setState({ isValid: true });
            const route = "/accor/" + this.props.match.params.documentId + "/node/" + 0;
            this.props.history.push(route);
        }).catch((err: any) => console.log(err));

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
