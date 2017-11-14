/**
 * Created by cantu on 13-Nov-17.
 */
import * as React from 'react';

import { CheckboxComponent } from "./CheckboxComponent";

import { PdfViewerComponent } from './PdfViewerComponent';

interface Document {
    link: string;
    name: string;
    detail: string;
    approved: boolean;
}
interface AccordionItemProps {
    documentIndex: number;
    document: Document;
    onDocumentReadCheckedCb: (key: number) => void;
    activeAccordion: number | null;
}
interface AccordionItemStates {
    documentRead: boolean;
}

export class AccordionItemComponent extends React.Component<AccordionItemProps, AccordionItemStates> {
    constructor(props: AccordionItemProps) {
        super(props);
        this.state = { documentRead: false };
        this.onScrollToEndEvent = this.onScrollToEndEvent.bind(this);
    }

    onScrollToEndEvent () {
        this.setState({documentRead: true});
    }

    public render (): JSX.Element {
        return (
            <div className="ui-g">
                <div className="ui-g-12" >
                    <PdfViewerComponent
                        documentIndex={this.props.documentIndex}
                        document={this.props.document}
                        lazy={this.props.activeAccordion === this.props.documentIndex}
                        scrollToEndEventCb={this.onScrollToEndEvent}/>
                </div>
                <div className="ui-g-12" >
                    {
                        this.state.documentRead ?
                        <CheckboxComponent
                            document={this.props.document}
                            documentIndex={this.props.documentIndex}
                            onDocumentReadChecked={this.props.onDocumentReadCheckedCb}/>
                        : 'Devam etmeden önce tüm dokumanı okuyunuz.'
                    }

                </div>
            </div>
        );
    }
}