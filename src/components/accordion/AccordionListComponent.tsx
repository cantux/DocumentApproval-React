import * as React from "react";

import { AccordionItemComponent } from '../common/AccordionItemComponent';

import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion'

import { match } from 'react-router-dom';
import {ApprovalComponent} from "../common/ApprovalComponent";

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
        console.log('first active accord: ', this.props.match.params.nodeId);
        this.state = {allChecked: false, isValid: false, documents: [], lazy: false, activeAccordion: this.props.match.params.nodeId};
        this.sendApproval = this.sendApproval.bind(this);
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
        this.onAccordionTabClose = this.onAccordionTabClose.bind(this);
    }

    mockDocuments: Document[] = [
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"},
        {"downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "/iki_sayfa.pdf"}
    ];

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
        this.setState({documents: _documents, allChecked: !_documents.some((value, index, array) => (!value["downloaded"])), activeAccordion: key + 1 });
    }

    // onAccordionTabOpen (e: any) {
    //     console.log('open', e)
    //     this.setState({activeAccordion: null});
    // }

    onAccordionTabClose (e: any) {
        console.log('close', e.originalEvent.target);
        // window.scrollTo(e.originalEvent.screenX, e.originalEvent.screenY);
        console.log('e.originalEvent.screenX: ', e.originalEvent.screenX, "e.originalEvent.screenY: ", e.originalEvent.screenY )
        var rect = e.originalEvent.target.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        // window.scrollTo(e.originalEvent.screenX, e.originalEvent.screenY);
        e.originalEvent.target.scrollTop = 0;
        this.setState({activeAccordion: e.index});
    }

    public render (): JSX.Element {
        const accordionItems = this.state.documents.map((item, index) => {
            return (
                <AccordionTab key={index} header={item.name}>
                    <AccordionItemComponent
                        documentIndex={index}
                        document={item}
                        onDocumentReadCheckedCb={this.onDocumentReadChecked}
                        activeAccordion={this.state.activeAccordion}/>
                </AccordionTab>);
        });

        return (
            <div className="ui-g">
                <div className="ui-g-12">
                    <Accordion
                        onTabClose={this.onAccordionTabClose}
                        activeIndex={this.state.activeAccordion}>
                        {accordionItems}
                    </Accordion>
                </div>
                <div className="ui-g-12">
                    <ApprovalComponent allChecked={this.state.allChecked}/>
                </div>
            </div>
        );
    }
}
