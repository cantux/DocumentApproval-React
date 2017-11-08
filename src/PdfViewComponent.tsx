import * as React from "react";

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Panel } from 'primereact/components/panel/Panel';

let viewer = require('./viewer.js');

// Types
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean
}
interface PdfViewProps {
    document: Document;
    onDocumentReadChecked: (key: number) => void;
    itemIndex: number;
}
interface PdfViewState {
    checked: boolean;
}
// End of Types


export class PdfViewComponent extends React.Component<PdfViewProps, PdfViewState> {
    constructor(props: PdfViewProps) {
        super(props);
        this.state = { checked: false };
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
    }

    componentDidMount () {
        viewer.load(this.props.itemIndex);
    }
    onDocumentReadChecked () {
        console.log('key: ', this.props.itemIndex);
        this.setState({ checked: !this.state.checked});
        this.props.onDocumentReadChecked(this.props.itemIndex);
    }

    public render (): JSX.Element {

        const pdfContainerStyle = {
            width: '100vw',
            height: '60vh',
            overflow: "auto",
            overflowY: "scroll"
        } as React.CSSProperties;

        return (
            <div className="ui-g-12" >
                <div id={"pdf-container" + this.props.itemIndex} style={pdfContainerStyle}>

                </div>
                <Panel>

                    {this.props.document.name} {this.props.document.documentLink}
                    <br/>
                    <Checkbox
                        label="Dökümanı okudum, şartları kabul ediyorum."
                        onChange={this.onDocumentReadChecked}
                        checked={this.state.checked}
                    />
                </Panel>
            </div>);
    }
}