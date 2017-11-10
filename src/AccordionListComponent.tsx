import * as React from "react";

import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion'
import { PdfViewerComponent } from './PdfViewerComponent';

import { match } from 'react-router-dom';
import {CheckboxComponent} from "./CheckboxComponent";
interface NavParam {
    documentId: number;
    nodeId: number;
}
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean;
}
interface AccordionListProps {
    match: match<NavParam>;
    history: any;
}
interface AccordionListState {
    allChecked: boolean;
    isValid: boolean;
    documents: Document[];
    lazy: boolean;
    activeAccordion: number | null;
}
// End of Types

export class AccordionListComponent extends React.Component<AccordionListProps, AccordionListState> {
    constructor(props: AccordionListProps) {
        super(props);
        this.state = {allChecked: false, isValid: false, documents: [], lazy: false, activeAccordion: this.props.match.params.nodeId};
        this.sendApproval = this.sendApproval.bind(this);
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
        this.onAccordionTabOpen = this.onAccordionTabOpen.bind(this);
        this.onAccordionTabClose = this.onAccordionTabClose.bind(this);

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
        }, 1000);
    }

    sendApproval () {
        console.log('todo POST list')
    }

    onDocumentReadChecked (key: number) {
        let _documents = this.state.documents;
        if(_documents[key])
        {
            _documents[key].downloaded = !_documents[key].downloaded;
        }
        this.setState({documents: _documents, allChecked: !_documents.some((value, index, array) => (!value["downloaded"])) });
    }

    onAccordionTabOpen (e: any) {
        console.log('open', e)
        this.setState({activeAccordion: null});
    }

    onAccordionTabClose (e: any) {
        console.log('close', e);
        this.setState({activeAccordion: e.index});
    }

    public render (): JSX.Element {
        const pdfViewItems = this.state.documents.map((item, index) => {
            return (
                <AccordionTab key={index} header={item.name}>

                    <PdfViewerComponent key={index} documentIndex={index} document={item}  lazy={this.state.activeAccordion === index}/>

                    <CheckboxComponent document={item} documentIndex={index} onDocumentReadChecked={this.onDocumentReadChecked}/>

                </AccordionTab>);
        });

        return (
            <Accordion onTabOpen={this.onAccordionTabOpen} onTabClose={this.onAccordionTabClose} activeIndex={this.state.activeAccordion}>
                {pdfViewItems}
            </Accordion>
        );
    }
}
