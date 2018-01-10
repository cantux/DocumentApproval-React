import * as React from "react";

let viewer = require('./viewer.js');

// Types
import Document from '../../../models/Document';
import { LoadingComponent } from '../LoadingComponent';
interface PdfViewerProps {
    document: Document;
    documentIndex: number;
    lazy: boolean;
    scrollToEndEventCb: () => any;
}
interface PdfViewerState {
    loadingStarted: boolean;
    loadingFinished: boolean;
    zoom: number;
}
// End of Types

export class PdfViewerComponent extends React.Component<PdfViewerProps, PdfViewerState> {
    private scrollToEndEvent: any = null;

    constructor(props: PdfViewerProps) {
        super(props);
        this.state = { loadingStarted: false, loadingFinished: false, zoom: 1 };
        this.zoomInClicked = this.zoomInClicked.bind(this);
        this.zoomOutClicked = this.zoomOutClicked.bind(this);
    }

    shouldComponentUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        return nextProps.lazy || nextState.loadingStarted || nextState.loadingFinished;
    }

    componentWillUpdate (nextProps: PdfViewerProps, nextState: PdfViewerState) {
        // load the document if it hasn't been loadingStarted before
      // confus
        if(!this.state.loadingStarted && !nextState.loadingStarted){
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, 1);
        }
    }

    componentDidMount () {
        // confus
        if(this.props.lazy){
            this.loadPdfSetStateAndScrollEvent(this.props.document.link, this.props.scrollToEndEventCb, 1);
        }
    }

    loadPdfSetStateAndScrollEvent (link: string, scrolledToEndEventCb: () => any, zoomScale: number) {
        viewer.load(this.props.documentIndex, link, zoomScale, this.onLoadingFinished);

        // confus
        this.setState({loadingStarted: true});

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

    onLoadingFinished = () => {
        this.setState({
            loadingFinished: true
        });
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

        const toggleLoadingMumboJumbo = this.props.lazy && (this.state.loadingStarted && !this.state.loadingFinished);
        const pdfContainerStyle = toggleLoadingMumboJumbo ? {
            height: '60vh',
            overflow: "auto",
            overflowY: "scroll",
            visibility: "hidden"
        } as React.CSSProperties
        : {
                height: '60vh',
                overflow: "auto",
                overflowY: "scroll"
        } as React.CSSProperties;

        const loadingStyle = !toggleLoadingMumboJumbo ? {  display: "none"
        } as React.CSSProperties : {} as React.CSSProperties;

        return (
            <div>
                <div style={loadingStyle}>
                    <LoadingComponent/>
                </div>
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
            </div>
        );
    }
}
