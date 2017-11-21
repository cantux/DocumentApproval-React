import * as React from 'react';

import { ErrorComponent } from '../common/ErrorComponent';

import { DocumentService } from '../../services/DocumentRetriever';

// Types
import Document from '../../models/Document';
import { match } from 'react-router-dom';
interface NavParam {
    referralId: string;
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

export class DocumentWizardComponent extends React.Component<DocumentWizardProps, DocumentWizardState> {
    constructor(props: DocumentWizardProps) {
        super(props);
        this.state = {checked: false, isValid: false};
    }

    componentWillMount () {
        DocumentService.getDocuments(this.props.match.params.referralId).subscribe(
            (documents: Document[]) => {
                this.setState({ isValid: true });
                const route = '/wiz/' + this.props.match.params.referralId + '/node/' + 0;
                this.props.history.push(route);
            });
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
