import * as React from "react";

let viewer = require('./viewer.js');

// Types
import Document from '../../../models/Document';
interface PdfViewerProps {
    document: Document;
    documentIndex: number;
    lazy: boolean;
    scrollToEndEventCb: () => any;
}
interface PdfViewerState {
    loaded: boolean;
    zoom: number;
}
// End of Types

export class PdfViewerComponent extends React.Component<PdfViewerProps, PdfViewerState> {
    private scrollToEndEvent: any = null;

    constructor(props: PdfViewerProps) {
        super(props);
        this.state = { loaded: false, zoom: 1 };
        this.zoomInClicked = this.zoomInClicked.bind(this);
        this.zoomOutClicked = this.zoomOutClicked.bind(this);
    }

    shouldComponentUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        return nextProps.lazy && !nextState.loaded;
    }

    componentWillUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        // load the document if it hasn't been loaded before
        if(!this.state.loaded && !nextState.loaded){
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, 1);
        }
    }

    componentDidMount () {
        if(this.props.lazy){
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, 1);
        }
    }

    loadPdfSetStateAndScrollEvent (link: string, scrolledToEndEventCb: () => any, zoomScale: number) {
        viewer.load(this.props.documentIndex, link, zoomScale);
        this.setState({loaded: true});
        if (document && !this.scrollToEndEvent){
            let pdfContainer = document.getElementById(`pdf-container${this.props.documentIndex}`);
            if (pdfContainer){
                this.scrollToEndEvent = pdfContainer.addEventListener('scroll', (e: any) => {
                    // pdfContainer ?
                    // console.log("scroll", pdfContainer.scrollTop ,pdfContainer.scrollHeight ,pdfContainer.offsetHeight)
                    // : void 0;
                    if (pdfContainer &&
                        (Math.ceil(pdfContainer.scrollTop) >= (pdfContainer.scrollHeight - pdfContainer.offsetHeight))
                    ) {
                        scrolledToEndEventCb();
                    }
                });
            }
        }
    }

    zoomOutClicked (e: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.zoom > 0.25){
            let newZoom = this.state.zoom - 0.10;
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, newZoom);
            this.setState({zoom: newZoom });
        }
    }

    zoomInClicked (e: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.zoom > 0.25){
            let newZoom = this.state.zoom + 0.10;
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, newZoom);
            this.setState({zoom: newZoom });
        }
    }

    public render (): JSX.Element {

        // const fixedTopElement = {
        //     position:"absolute",
        //     zIndex:100,
        //     right: "5%"
        // } as React.CSSProperties;
        // const fixedLowerElement = {
        //     marginTop: "5%",
        //     position:"absolute",
        //     zIndex:100,
        //     right: "5%"
        // } as React.CSSProperties;

        const pdfContainerStyle = {
            height: '60vh',
            overflow: "auto",
            overflowY: "scroll"
        } as React.CSSProperties;

        return (
            <div id={`pdf-container${this.props.documentIndex}`} style={pdfContainerStyle}>
                {/*<button*/}
                    {/*id={`zoominbutton${this.props.documentIndex}`}*/}
                    {/*type="button"*/}
                    {/*style={fixedTopElement}*/}
                    {/*onClick={this.zoomInClicked}>zoom in</button>*/}
                {/*<button*/}
                    {/*id={`zoomoutbutton${this.props.documentIndex}`}*/}
                    {/*type="button"*/}
                    {/*style={fixedLowerElement}*/}
                    {/*onClick={this.zoomOutClicked}>zoom out</button>*/}
            </div>
        );
    }
}
