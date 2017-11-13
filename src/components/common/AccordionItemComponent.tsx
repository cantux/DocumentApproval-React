/**
 * Created by cantu on 13-Nov-17.
 */
import * as React from 'react';

import { CheckboxComponent } from "./CheckboxComponent";

import { PdfViewerComponent } from './PdfViewerComponent';

interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean;
}
interface AccordionItemProps {
    documentIndex: number;
    document: Document | null;
    onDocumentReadCheckedCb: (key: number) => void;
    activeAccordion: number | null;
}
interface AccordionItemStates {}

export class AccordionItemComponent extends React.Component<AccordionItemProps, AccordionItemStates> {
    constructor(props: AccordionItemProps) {
        super(props);
        this.onScrollToEndEvent = this.onScrollToEndEvent.bind(this);
    }

    onScrollToEndEvent () {
        console.log('scrolled to end');
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
                    <CheckboxComponent
                        document={this.props.document}
                        documentIndex={this.props.documentIndex}
                        onDocumentReadChecked={this.props.onDocumentReadCheckedCb}/>
                </div>
            </div>
        );
    }
}