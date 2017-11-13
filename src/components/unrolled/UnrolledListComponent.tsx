import * as React from "react";

// import { PdfViewerComponent } from './PdfViewerComponent';
import { CheckboxComponent } from '../common/CheckboxComponent';
import { ErrorComponent } from '../common/ErrorComponent';
import { ApprovalComponent } from '../common/ApprovalComponent'

// import * as rpn from 'request-promise-native';

import { match } from 'react-router-dom';
// Types
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean
}
interface NavParam {
    documentId: number;
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

export class PdfListComponent extends React.Component<UnrolledListProps, UnrolledListState> {
    constructor(props: UnrolledListProps) {
        super(props);
        this.state = {allChecked: false, isValid: false, documents: []};
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
    }

    mockDocuments: Document[] = [
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili açıklama.", "name":"Başvuru Formu", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/0?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun açıklama.", "name":"Başvuru Formu", "documentLink": "https://www.google.com.tr/?gfe_rd=cr&dcr=0&ei=iiT8WcukCrOt8wfHw5qQAQ"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/1?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "fourth"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/2?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "sixth"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/3?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "eighth"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/4?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "tenth"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/5?t=123"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "twelweth"}];

    componentWillMount () {
        setTimeout(() => {
            if (this.mockDocuments) {
                this.setState({ isValid: true, documents: this.mockDocuments });
            }
        }, 250);
    }

    onDocumentReadChecked (key: number) {
        let _documents = this.state.documents;
        if(_documents[key])
        {
            _documents[key].downloaded = !_documents[key].downloaded;
        }
        this.setState({documents: _documents, allChecked: !_documents.some((value, index, array) => (!value["downloaded"])) });
    }

    public render (): JSX.Element {
        const pdfViewItems = this.state.documents.map((item, index) => {
            return (
                <div className="ui-g">
                    <div className="ui-g-12" >
                        {/*<PdfViewerComponent documentIndex={index} document={item} lazy={true}/>*/}
                    </div>
                    <div className="ui-g-12" >
                        <CheckboxComponent document={item} documentIndex={index} onDocumentReadChecked={this.onDocumentReadChecked}/>
                    </div>
                </div>
            );
        });
        return (
                this.state.isValid ?
                <div>
                    {pdfViewItems}
                    <ApprovalComponent allChecked={this.state.allChecked}/>
                </div>
                : <ErrorComponent message={'Geçersiz döküman onay tablosu.'}/>
            );
    }
}