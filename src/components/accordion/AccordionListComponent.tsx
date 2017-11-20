import * as React from "react";

import { AccordionItemComponent } from '../common/AccordionItemComponent';
import { LoadingComponent } from '../common/LoadingComponent';

import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion'

import {ApprovalComponent} from "../common/ApprovalComponent";

// import * as rpn from 'request-promise-native';

import Document from '../../models/Document';
import { match } from 'react-router-dom';
import {ErrorComponent} from "../common/ErrorComponent";
interface NavParam {
    documentId: string;
    nodeId: number;
}
interface AccordionListProps {
    match: match<NavParam>;
    history: any;
}
interface AccordionListState {
    error: boolean;
    errorMessage: string;

    isValid: boolean;
    allChecked: boolean;
    documents: Document[];
    lazy: boolean;
    activeAccordion: number | null;
}
// End of Types

export class AccordionListComponent extends React.Component<AccordionListProps, AccordionListState> {
    constructor(props: AccordionListProps) {
        super(props);
        this.state = {error: false, errorMessage: "no error, you shouldn't see this", allChecked: false, isValid: false, documents: [], lazy: false, activeAccordion: this.props.match.params.nodeId};
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
        //     uri: `${window.location.protocol}//${window.location.host}/InstantWeb/rs/docs?t=${this.props.match.params.documentId}`,
        //     json: true,
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log('get documents response', response);
        //     this.setState({ isValid: true, documents: response });
        // }).catch((reason: any) => {
        //     console.log(reason);
        //     this.setState({ error: true, errorMessage: "Bu referans numarasına ait dökümanlar bulunamadı. Sürece kasadan devam ediniz."});
        // });
        setTimeout(() => {
            if(this.props.match.params.documentId === "noDoc") {
                this.setState({ error: true, errorMessage: "Bu referans numarasına ait dökümanlar bulunamadı. Sürece kasadan devam ediniz."});
            }
            else if (this.mockDocuments) {
                this.setState({ isValid: true, documents: this.mockDocuments });
            }
        }, 3000);
    }

    sendApproval () {
        console.log('approval comp post');
        // rpn({
        //     uri: `${window.location.protocol}//${window.location.host}/InstantWeb/rs/docs?t=${this.props.match.params.documentId}`,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     },
        //     body: JSON.stringify(this.state.documents)
        // }).then((response) => {
        //     console.log('approval response', response);
        //     this.props.history.push(`/ref/${response}`);
        // }).catch((reason) => {
        //     console.log(reason);
        //     this.setState({error: true, errorMessage: "Onaylama başarısız. Referans Kodu oluşturulamadı. Sürece kasadan devam ediniz."});
        // });
        setTimeout(() => {
            if(this.props.match.params.documentId === "noRef") {
                this.setState({ error: true, errorMessage: "Bu referans numarasına ait dökümanlar bulunamadı. Sürece kasadan devam ediniz."});
            }
            else {
                const response = 123456;
                console.log('approval response', response);
                this.props.history.push(`/ref/${response}`);
            }

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
        // console.log('clientHeight: ', e.originalEvent.target.clientHeight);

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
            this.state.error?
                <ErrorComponent message={this.state.errorMessage}/>
                :
                this.state.isValid ?
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
                    :
                    <div>
                        {'Lütfen Bekleyiniz...'}
                        <LoadingComponent/>
                    </div>
        );
    }
}
