import * as React from "react";

import { AccordionItemComponent } from '../common/AccordionItemComponent';

import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion'

import { match } from 'react-router-dom';
import {ApprovalComponent} from "../common/ApprovalComponent";

import * as rpn from 'request-promise-native';

interface NavParam {
    documentId: number;
    nodeId: number;
}
interface Document {
    link: string;
    name: string;
    detail: string;
    approved: boolean;
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
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "/iki_sayfa.pdf"}
    ];

    componentWillMount () {
        rpn({
            uri: `https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=${this.props.match.params.nodeId}`,
            json: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('get documents response', response);
            this.setState({ isValid: true, documents: response });
        });
        // setTimeout(() => {
        //     if (this.mockDocuments) {
        //         this.setState({ isValid: true, documents: this.mockDocuments });
        //     }
        // }, 1000);
    }

    sendApproval () {
        //console.log('todo POST list')
        rpn({
            uri: `https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=${this.props.match.params.nodeId}`,
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.documents)
        }).then((response) => {
            console.log('approval response', response);
        });
    }

    onDocumentReadChecked (key: number) {
        let _documents = this.state.documents;
        if(_documents[key])
        {
            _documents[key].approved = !_documents[key].approved;
        }
        this.setState({documents: _documents, allChecked: !_documents.some((value, index, array) => (!value["approved"])), activeAccordion: key + 1 });
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
