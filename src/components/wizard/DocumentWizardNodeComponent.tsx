import * as React from "react";

import { ErrorComponent } from "../common/ErrorComponent";

import { Button } from 'primereact/components/button/Button';
import { Panel } from 'primereact/components/panel/Panel';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Growl, GrowlMessage } from 'primereact/components/growl/Growl';

// import * as rpn from 'request-promise-native';

import { match } from 'react-router-dom';
// Types
interface Document {
    link: string;
    name: string;
    detail: string;
    approved: boolean;
}
interface NavParam {
    documentId: number;
    nodeId: number;
}
interface DocumentWizardNodeProps {
    match: match<NavParam>;
    history: any;
}
interface DocumentWizardNodeState {
    checked: boolean;
    isValid: boolean;
    documents: Document[];
    messages: GrowlMessage[];
}
// End of Types

export class DocumentWizardNodeComponent extends React.Component<DocumentWizardNodeProps, DocumentWizardNodeState>{
    constructor(props: DocumentWizardNodeProps) {
        super(props);
        this.state = {checked: false, isValid: true, documents: [], messages: []};
        this.documentDownloaded = this.documentDownloaded.bind(this);
        this.sendApproval = this.sendApproval.bind(this);
    }

    mockDocuments: Document[] = [
        {"approved": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili açıklama.", "name":"Başvuru Formu", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun açıklama.", "name":"Başvuru Formu", "link": "https://www.google.com.tr/?gfe_rd=cr&dcr=0&ei=iiT8WcukCrOt8wfHw5qQAQ"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"},
        {"approved": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "link": "twelweth"}];

    componentWillMount () {
        // rpn({
        //     uri: "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t=123",
        //     method: 'GET',
        //     json: true
        // }).then((response) => {
        //     this.setState({ isValid: true, documents: response });
        //     let route = "/wiz/" + this.props.match.params.documentId + "/node/" + 0;
        //     if (this.props.match.params.nodeId)
        //     {
        //         route = "/wiz/" + this.props.match.params.documentId + "/node/" + this.props.match.params.nodeId;
        //     }
        //     this.props.history.push(route);
        //
        // }).catch((err) => console.log(err));

        setTimeout(() => {
            if (this.mockDocuments) {
                this.setState({ isValid: true, documents: this.mockDocuments });
                let route = "/wiz/" + this.props.match.params.documentId + "/node/" + 0;
                if (this.props.match.params.nodeId)
                {
                    route = "/wiz/" + this.props.match.params.documentId + "/node/" + this.props.match.params.nodeId;
                }
                this.props.history.push(route);
            }
        }, 250);
    }

    private sendApproval = () => {

    }

    private onLicenseAgreed = () => {
        this.setState({checked: !this.state.checked});
    }

    documentDownloaded = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const docs = this.state.documents;
        docs[this.props.match.params.nodeId].approved = true;
        this.setState({documents: docs, messages: []});
    }

    gotoNextNode = (event: React.MouseEvent<HTMLButtonElement>) => {
        // if document is downloaded go to the node, otherwise show message.
        if(!this.state.documents[this.props.match.params.nodeId].approved)
        {
            this.setState({messages:[{severity:'warn', summary:'Okunmamış döküman', detail:'Adımı geçmeden önce dökümanı indirmelisiniz.'}]});
        }
        else
        {
            const nextNodeLink = "/wiz/" + this.props.match.params.documentId + "/node/" + (Number(this.props.match.params.nodeId) + 1);
            this.props.history.push(nextNodeLink)
        }
    }

    public render (): JSX.Element {
        const documentExists = (this.state.documents.length > 0) && (this.state.documents.length > this.props.match.params.nodeId);
        const lastDocument = this.state.documents.length == Number(this.props.match.params.nodeId);
        // const embedResponsive = {
        //     position: relative,
        //     display: block,
        //     height: 0,
        //     padding: 0,
        //     overflow: hidden
        // };

        return (
            <div>
                <Growl value={this.state.messages}></Growl>
                {
                    this.state.isValid ?
                        <div>
                            {/*<iframe src="http://docs.google.com/gview?url=http://path.com/to/your/pdf.pdf&embedded=true" style="width:600px; height:500px;" frameborder="0"></iframe>*/}
                            {/*<iframe src="/kredi_sozlesmesi.pdf" width="500" height="500"/>*/}
                            {/*<div className={embedResponsive}>*/}
                                {/*<object data="/kredi_sozlesmesi.pdf" type="application/pdf" width="100%" height="100%"> </object>*/}
                            {/*</div>*/}
                            {/*<embed src="kredi_sozlesmesi.pdf" width="600" height="500"/>*/}
                            {
                                lastDocument ?
                                    <Panel>
                                        <div className="ui-g">
                                            <div className="ui-g-12">
                                                <Checkbox
                                                    label="Tüm dökümanları okudum, şartları kabul ediyorum."
                                                    onChange={this.onLicenseAgreed}
                                                    checked={this.state.checked}
                                                />
                                            </div>
                                            <div className="ui-g-12">
                                                <Button
                                                    onClick={this.sendApproval}
                                                    label={"Onayı Gönder"}
                                                    icon={"fa-arrow-right"}
                                                    iconPos={"right"}
                                                    disabled={!this.state.checked}
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                :

                                    <Panel header={documentExists ? this.state.documents[this.props.match.params.nodeId].name : "Döküman Bulunamadı" }>
                                        <div className="ui-g">
                                            <div className="ui-g-12">
                                                { documentExists ? this.state.documents[this.props.match.params.nodeId].detail : "Açıklama sağlanmamış." }
                                            </div>
                                                <div className="ui-g-12">
                                                    <a
                                                        href={documentExists ?  this.state.documents[this.props.match.params.nodeId].link : '#'}
                                                        download={documentExists ?  this.state.documents[this.props.match.params.nodeId].link : 'Empty'}
                                                        onClick={this.documentDownloaded}
                                                    >
                                                    <Button
                                                        label={"Dökümanı Kaydet"}
                                                        icon={"fa-save"}
                                                        iconPos={"left"}
                                                    />
                                                    </a>
                                                    <Button
                                                        onClick={this.gotoNextNode}
                                                        label={"Sonraki"}
                                                        icon={"fa-arrow-right"}
                                                        iconPos={"right"}
                                                    />
                                                </div>
                                        </div>
                                    </Panel>
                            }
                        </div> :
                        <ErrorComponent message={'Geçersiz döküman onaylama sihirbazı!!'}/>
                }
            </div>

        );

    }
}
