import * as React from "react";

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Panel } from 'primereact/components/panel/Panel';

// Types
interface Document {
    link: string;
    name: string;
    detail: string;
    approved: boolean
}
interface CheckboxProps {
    documentIndex: number;
    document: Document;
    onDocumentReadChecked: (key: number) => void;
}
interface CheckboxState {}
// End of Types

export class CheckboxComponent extends React.Component<CheckboxProps, CheckboxState>{
    constructor(props: CheckboxProps) {
        super(props);
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
    }

    onDocumentReadChecked () {
        this.props.onDocumentReadChecked(this.props.documentIndex);
    }

    public render (): JSX.Element {
        const wordWrap = {"wordWrap": "break-word"};
        return (
            <Panel>
                <div style={wordWrap}>
                     {this.props.document.detail}
                </div>
                <br/>
                <Checkbox
                    label="Dökümanı okudum, şartları kabul ediyorum."
                    onChange={this.onDocumentReadChecked}
                    checked={this.props.document.approved || false}
                />
            </Panel>
        );

    }
}
