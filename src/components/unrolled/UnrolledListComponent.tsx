import * as React from 'react';

// import { PdfViewerComponent } from './PdfViewerComponent';

import { CheckboxComponent } from '../common/CheckboxComponent';
import { ErrorComponent } from '../common/ErrorComponent';
import { ApprovalComponent } from '../common/ApprovalComponent';

import { DocumentService } from '../../services/Document';

// Types
import { match } from 'react-router-dom';
import Document from '../../models/Document';

interface NavParam {
    referralId: string;
    nodeId: number;
}
interface UnrolledListProps {
    match: match<NavParam>;
    history: any;
}
interface UnrolledListState {
    allChecked: boolean;
    isValid: boolean;
    documents: Document[];
}
// End of Types

export class UnrolledListComponent extends React.Component<UnrolledListProps, UnrolledListState> {
    constructor(props: UnrolledListProps) {
        super(props);
        this.state = {allChecked: false, isValid: false, documents: []};
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
        this.sendApproval = this.sendApproval.bind(this);
    }

    componentWillMount () {
        DocumentService.getDocuments(this.props.match.params.referralId).subscribe(
            (documents: Document[]) => {
                this.setState({ isValid: true, documents: documents });
            }
        );
    }

    sendApproval () {
        DocumentService.postApproval(this.props.match.params.referralId, this.state.documents).subscribe(
            (referenceCode: number) => {
                console.log('approval response', referenceCode);
                this.props.history.push(`/reference/${referenceCode}`);
            }
        );
    }

    onDocumentReadChecked (key: number) {
        let _documents = this.state.documents;
        if (_documents[key]) {
            _documents[key].approved = !_documents[key].approved;
        }
        this.setState({
            documents: _documents,
            allChecked: !_documents.some((value, index, array) => (!value.approved))
        });
    }

    public render (): JSX.Element {
        const pdfViewItems = this.state.documents.map((item, index) => {
            return (
                <div className="ui-g" key={index}>
                    <div className="ui-g-12" >
                        {/*<PdfViewerComponent documentIndex={index} document={item} lazy={true}/>*/}
                    </div>
                    <div className="ui-g-12" >
                        <CheckboxComponent
                            document={item}
                            documentIndex={index}
                            onDocumentReadChecked={this.onDocumentReadChecked}
                        />
                    </div>
                </div>
            );
        });
        return (
                this.state.isValid ?
                <div>
                    {pdfViewItems}
                    <ApprovalComponent allChecked={this.state.allChecked} approvalCb={this.sendApproval}/>
                </div>
                : <ErrorComponent message={'Geçersiz döküman onay tablosu.'}/>
            );
    }
}
