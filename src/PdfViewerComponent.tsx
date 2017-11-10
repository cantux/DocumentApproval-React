import * as React from "react";

let viewer = require('./viewer.js');

// Types
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean
}
interface PdfViewerProps {
    document: Document;
    documentIndex: number;
    lazy: boolean;
}
interface PdfViewerState {}
// End of Types

export class PdfViewerComponent extends React.Component<PdfViewerProps, PdfViewerState> {
    constructor(props: PdfViewerProps) {
        super(props);
        this.state = { lazy: this.props.lazy };
    }

    shouldComponentUpdate (e: any) {
        console.log('should update', e);
        return e.lazy;
    }

    componentWillUpdate (e: any) {
        console.log('will update', e);
        console.log('doc index', this.props.documentIndex);
        viewer.load(this.props.documentIndex, '/iki_sayfa.pdf');
    }

    componentDidMount () {
        console.log('copMount');
        if(!this.props.lazy){
            console.log('copMount, lazy false', this.props.documentIndex);
            viewer.load(this.props.documentIndex, '/iki_sayfa.pdf');
        }
    }

    public render (): JSX.Element {

        const pdfContainerStyle = {
            width: '100vw',
            height: '60vh',
            overflow: "auto",
            overflowY: "scroll"
        } as React.CSSProperties;

        return (
            <div id={"pdf-container" + this.props.documentIndex} style={pdfContainerStyle}>
            </div>
        );
    }
}