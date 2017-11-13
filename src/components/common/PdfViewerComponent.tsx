import * as React from "react";

let viewer = require('./../../viewer.js');

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
    scrollToEndEventCb: () => any;
}
interface PdfViewerState {
    loaded: boolean;
}
// End of Types

export class PdfViewerComponent extends React.Component<PdfViewerProps, PdfViewerState> {
    private scrollToEndEvent : any = null;

    constructor(props: PdfViewerProps) {
        super(props);
        this.state = { loaded: false };
    }

    shouldComponentUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        return nextProps.lazy && !nextState.loaded;
    }

    componentWillUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        // load the document if it hasn't been loaded before
        if(!this.state.loaded && !nextState.loaded){
            this.loadPdfSetStateAndScrollEvent(this.props.document.documentLink, this.props.scrollToEndEventCb);
        }
    }

    componentDidMount () {
        if(this.props.lazy){
            this.loadPdfSetStateAndScrollEvent(this.props.document.documentLink, this.props.scrollToEndEventCb);
        }
    }

    private loadPdfSetStateAndScrollEvent (documentLink: string, scrolledToEndEventCb: () => any) {
        viewer.load(this.props.documentIndex, documentLink);
        this.setState({loaded: true});

        if (document && !this.scrollToEndEvent){
            console.log(`pdf-container${this.props.documentIndex}`);
            let pdfContainer = document.getElementById(`pdf-container${this.props.documentIndex}`);
            console.log(pdfContainer);
            if (pdfContainer){
                console.log('before event reg');
                this.scrollToEndEvent = pdfContainer.addEventListener('scroll', (e: any) => {
                    console.log('scrolling');
                    if (pdfContainer && pdfContainer.scrollTop === (pdfContainer.scrollHeight - pdfContainer.offsetHeight))
                    {
                        alert('this is the end myfriend');
                    }
                });
            }
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
            <div id={`pdf-container${this.props.documentIndex}`} style={pdfContainerStyle}>
            </div>
        );
    }
}