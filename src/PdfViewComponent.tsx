import * as React from "react";

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Panel } from 'primereact/components/panel/Panel';

// Types
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean
}
interface PdfListProps {
    document: Document;
    onDocumentReadChecked: (key: number) => void;
    itemIndex: number;
}
interface PdfListState {
    checked: boolean;
}
// End of Types


export class PdfViewComponent extends React.Component<PdfListProps, PdfListState> {
    constructor(props: PdfListProps) {
        super(props);
        this.state = { checked: false };
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
    }

    onDocumentReadChecked () {
        console.log('key: ', this.props.itemIndex);
        this.setState({ checked: !this.state.checked})
        this.props.onDocumentReadChecked(this.props.itemIndex)
    }

    public render (): JSX.Element {
        // const pdfContainerStyle = {
        //     position: "relative",
        //     height: 0,
        //     overflow: "hidden"
        // } as React.CSSProperties;
        //
        // const iframeStyle = {
        //     position: "absolute",
        //     top:0,
        //     left: 0,
        //     width: "100%",
        //     height: "100%",
        //     margin: 0,
        //     padding: 0,
        //     border: 'none'
        // } as React.CSSProperties;

        return (
            <div className="ui-g-12">

                {/*<div style={pdfContainerStyle}>*/}
                    {/*<object data="/kredi_sozlesmesi.pdf" type="application/pdf" width="100%" height="100%"> </object>*/}
                        <iframe src="./kredi_sozlesmesi.pdf" />
                        {/*style={iframeStyle}*/}
                        {/*<iframe id="pdfviewer" src="http://docs.google.com/gview?embedded=true&url=http://bosislermudurlugu.herokuapp.com/kredi_sozlesmesi.pdf&amp;embedded=true" width="100%" height="100%"></iframe>*/}
                {/*</div>*/}
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