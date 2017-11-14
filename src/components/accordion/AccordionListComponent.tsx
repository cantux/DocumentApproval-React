import * as React from "react";

import { AccordionItemComponent } from '../common/AccordionItemComponent';

import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion'

import {ApprovalComponent} from "../common/ApprovalComponent";

// import * as rpn from 'request-promise-native';

import Document from '../../models/Document';
import { match } from 'react-router-dom';
interface NavParam {
    documentId: number;
    nodeId: number;
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
        {"approved": false, "detail": "Başvuru bilgilerinizi gözden geçirip doğruluğunu kontrol edebilirsiniz.", "name": "Başvuru Formu", "link": "/Basvuru Formu.pdf"},
        {"approved": false, "detail": "Kredi başvurunuz ile ilgili yasal doküman.", "name": "Kredi Sözleşmesi", "link": "/Kredi Sozlesmesi.pdf"},
        {"approved": false, "detail": "Bankadan alacağınız hizmetlere ilişkin sözleşme", "name": "Hizmet Sözleşmesi", "link": "/Hizmet Sozlesmesi.pdf"},

    ];

    componentWillMount () {
        // rpn({
        //     uri: `https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=${this.props.match.params.documentId}`,
        //     json: true,
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log('get documents response', response);
        //     this.setState({ isValid: true, documents: response });
        // });
        setTimeout(() => {
            if (this.mockDocuments) {
                this.setState({ isValid: true, documents: this.mockDocuments });
            }
        }, 1000);
    }

    sendApproval () {
        console.log('approval comp post');
        // rpn({
        //     uri: `https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=${this.props.match.params.documentId}`,
        //     json: true,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state.documents)
        // }).then((response) => {
        //     console.log('approval response', response);
        //     this.props.history.push(`/ref/${response}`);
        // });
        setTimeout(() => {
            const response = 123456;
            console.log('approval response', response);
            this.props.history.push(`/ref/${response}`);
        }, 250 );
    }

    onDocumentReadChecked (key: number) {
        let _documents = this.state.documents;
        if(_documents[key])
        {
            _documents[key].approved = !_documents[key].approved;
        }

        var appHeaderHeight = (((document||{}).getElementById('app-header')||{}) as Element).clientHeight;
        window.scrollTo(0, appHeaderHeight + (14 * (key + 1)) / 2);

        this.setState({documents: _documents, allChecked: !_documents.some((value, index, array) => (!value["approved"])), activeAccordion: key + 1 });
    }

    onAccordionTabClose (e: any) {
        console.log('clientHeight: ', e.originalEvent.target.clientHeight);

        var appHeaderHeight = (((document||{}).getElementById('app-header')||{}) as Element).clientHeight;

        window.scrollTo(0, appHeaderHeight + (e.originalEvent.target.clientHeight * e.index) / 2);

        this.setState({activeAccordion: e.index});
    }

    public render (): JSX.Element {
        const accordionItems = this.state.documents.map((item, index) => {
            return (
                <AccordionTab
                    key={index}
                    header={`${item.name}${item.approved ? "" : " - Okunmamış"}`}
                >

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
                    <ApprovalComponent allChecked={this.state.allChecked} approvalCb={this.sendApproval}/>
                </div>
            </div>
        );
    }
}
