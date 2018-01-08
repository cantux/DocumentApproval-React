import * as React from 'react';

import { ErrorComponent } from '../common/ErrorComponent';

import { Button } from 'primereact/components/button/Button';
import { Panel } from 'primereact/components/panel/Panel';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Growl, GrowlMessage } from 'primereact/components/growl/Growl';

// Types
import Document from '../../models/Document';
import { match } from 'react-router-dom';
import { DocumentService } from '../../services/Document';
interface NavParam {
    referralId: string;
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

export class DocumentWizardNodeComponent extends React.Component<DocumentWizardNodeProps, DocumentWizardNodeState> {
    constructor(props: DocumentWizardNodeProps) {
        super(props);
        this.state = {checked: false, isValid: true, documents: [], messages: []};
        this.documentDownloaded = this.documentDownloaded.bind(this);
        this.sendApproval = this.sendApproval.bind(this);
    }

    componentWillMount () {
        DocumentService.getDocuments(this.props.match.params.referralId).subscribe(
            (documents: Document[]) => {
                this.setState({ isValid: true, documents: documents });
                let route = '/wiz/' + this.props.match.params.referralId + '/node/' + 0;
                if (this.props.match.params.nodeId) {
                    route = '/wiz/' + this.props.match.params.referralId + '/node/' + this.props.match.params.nodeId;
                }
                this.props.history.push(route);
            }
        );
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
        if (!this.state.documents[this.props.match.params.nodeId].approved) {
            this.setState({messages: [{severity: 'warn', summary: 'Okunmamış döküman', detail: 'Adımı geçmeden önce dökümanı indirmelisiniz.'}]});
        } else {
            const nextNodeLink = '/wiz/' + this.props.match.params.referralId + '/node/' + (Number(this.props.match.params.nodeId) + 1);
            this.props.history.push(nextNodeLink);
        }
    }

    public render (): JSX.Element {
        const documentExists = (this.state.documents.length > 0) && (this.state.documents.length > this.props.match.params.nodeId);
        const lastDocument = this.state.documents.length == Number(this.props.match.params.nodeId);

        return (
            <div>
                <Growl value={this.state.messages}/>
                {
                    this.state.isValid ?
                        <div>
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
                                                    label={'Onayı Gönder'}
                                                    icon={'fa-arrow-right'}
                                                    iconPos={'right'}
                                                    disabled={!this.state.checked}
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                :

                                    <Panel header={documentExists ? this.state.documents[this.props.match.params.nodeId].name : 'Döküman Bulunamadı'}>
                                        <div className="ui-g">
                                            <div className="ui-g-12">
                                                {documentExists ? this.state.documents[this.props.match.params.nodeId].detail : 'Açıklama sağlanmamış.'}
                                            </div>
                                                <div className="ui-g-12">
                                                    <a
                                                        href={documentExists ?  this.state.documents[this.props.match.params.nodeId].link : '#'}
                                                        download={documentExists ?  this.state.documents[this.props.match.params.nodeId].link : 'Empty'}
                                                        onClick={this.documentDownloaded}
                                                    >
                                                    <Button
                                                        label={'Dökümanı Kaydet'}
                                                        icon={'fa-save'}
                                                        iconPos={'left'}
                                                    />
                                                    </a>
                                                    <Button
                                                        onClick={this.gotoNextNode}
                                                        label={'Sonraki'}
                                                        icon={'fa-arrow-right'}
                                                        iconPos={'right'}
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
