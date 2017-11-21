import * as React from 'react';

// Types
import { match } from 'react-router-dom';
interface NavParam {
    referralId: number;
}
interface AccordionRedirectorProps {
    match: match<NavParam>;
    history: any;
}
interface AccordionRedirectorState {}
// End of Types

export class AccordionRedirectorComponent extends React.Component<AccordionRedirectorProps, AccordionRedirectorState> {
    constructor(props: AccordionRedirectorProps) {
        super(props);
    }

    componentDidMount () {
        const route = '/accor/' + this.props.match.params.referralId + '/node/' + 0;
        this.props.history.push(route);
    }

    public render (): JSX.Element {
        return (
            <div>
                {'Lütfen Bekleyiniz...'}
            </div>
        );
    }
}
