import * as React from 'react';

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Button } from 'primereact/components/button/Button';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Panel } from 'primereact/components/panel/Panel';

import { ErrorComponent } from '../common/ErrorComponent';

import * as rpn from 'request-promise-native';

// Types
import { match } from 'react-router-dom';
interface Document {
    link: string;
}
interface NavParam {
    documentId: number;
}
interface DocumentsTableProps {
    match: match<NavParam>;
}
interface DocumentsTableState {
    checked: boolean;
    documents: Document[];
    documentsLength: number;
    isValid: boolean;
}
// End of Types

export class DocumentsTableComponent extends React.Component<DocumentsTableProps, DocumentsTableState>{
    private mockDocuments: Document[];

    constructor(props: DocumentsTableProps) {
        super(props);
        this.state = {checked: false, documents: [], documentsLength: 0, isValid: true};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLazyLoad = this.onLazyLoad.bind(this);
    }

    componentWillMount () {
        this.checkIsValid(this.props.match);
    }

    checkIsValid (match: match<NavParam>) {
        console.log('match url: ', match.url);
        // rpn({
        //     uri: match.url,
        //     method: 'POST',
        //     json: true,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(match.params)}
        // ).then((response: any) => (response.json()));
        this.setState({isValid: true});
    }

    componentDidMount () {
        this.mockDocuments = [
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=1'},
            {'link': 'second'},
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=3'},
            {'link': 'fourth'},
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=5'},
            {'link': 'sixth'},
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=7'},
            {'link': 'eighth'},
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=9'},
            {'link': 'tenth'},
            {'link': 'https://fbilpapp01t.fibabanka.local/InstantWeb/faces/instant/file?f=11'},
            {'link': 'twelweth'}];
        this.setState({documentsLength: this.mockDocuments.length});
    }

    onLazyLoad (event: any) {
        // simulate lazy loading
        setTimeout(() => {
            if (this.mockDocuments) {
                this.setState({documents: this.mockDocuments.slice(event.first, (event.first + event.rows))});
            }
        },         250);
    }

    handleSubmit () {
        rpn( {
            uri: '/submitData',
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)}
        ).then(
            (response: any) => {
                console.log(response);
            }
        );
    }

    private onLicenseAgreed = () => {
        this.setState({checked: !this.state.checked});
    }

    columnClicked (event: any) {
        console.log('onclick event: ', event);
        event.preventDefault();
    }

    public render (): JSX.Element {
        let cols = [
            {field: 'link', header: 'İndirilmemiş'}
        ];

        let columnBody = (rowData: any, column: any) => {
            return <div onClick={this.columnClicked}>{rowData.link}</div>;
        };

        const wordWrap = {'word-wrap': 'break-word'};

        let dynamicColumns: JSX.Element[] = cols.map((col, i) => {
            return (
                <Column body={columnBody} style={wordWrap} key={col.field} field={col.field} header={col.header}/>
            );
        });

        return (
            <div>
                {
                    this.state.isValid ?
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="ui-g">
                                <div className="ui-g-12">
                                    <Panel>
                                        <div className="content-section implementation">
                                            <DataTable
                                                value={this.state.documents}
                                                responsive={true}
                                                header="Responsive"
                                                paginator={true}
                                                rows={5}
                                                totalRecords={this.state.documentsLength}
                                                lazy={true}
                                                onLazyLoad={this.onLazyLoad}
                                            >
                                                {dynamicColumns}
                                            </DataTable>
                                        </div>
                                    </Panel>
                                </div>
                                <div className="ui-g-12">
                                    <Checkbox
                                        label="I accept the terms and conditions"
                                        onChange={this.onLicenseAgreed}
                                        checked={this.state.checked}
                                    />
                                </div>
                                <div className="ui-g-12">
                                    <Button label="Gönder" type="submit" />
                                </div>
                            </div>
                        </form>
                    </div> :
                    <ErrorComponent message={'Geçersiz döküman onay tablosu.'}/> }
            </div>

        );

    }
}
