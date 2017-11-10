import * as React from "react";

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Panel } from 'primereact/components/panel/Panel';

// import * as rpn from 'request-promise-native';

// Types
interface Document {
    documentLink: string;
    name: string;
    detail: string;
    downloaded: boolean
}
interface CheckboxProps {
    documentIndex: number;
    document: Document;
    onDocumentReadChecked: (key: number) => void;
}
interface CheckboxState {
    checked: boolean;
}
// End of Types

export class CheckboxComponent extends React.Component<CheckboxProps, CheckboxState>{
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {checked: false,}
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
    }

    onDocumentReadChecked () {
        this.setState({ checked: !this.state.checked});
        this.props.onDocumentReadChecked(this.props.documentIndex);
    }

    public render (): JSX.Element {
        const wordWrap = {"word-wrap": "break-word"};
        return (
            <Panel>
                <div style={wordWrap}>
                     {this.props.document.name} {this.props.document.documentLink}
                </div>
                <br/>
                <Checkbox
                    label="Dökümanı okudum, şartları kabul ediyorum."
                    onChange={this.onDocumentReadChecked}
                    checked={this.state.checked}
                />
            </Panel>
        );

    }
}
