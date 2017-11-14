/**
 * Created by cantu on 13-Nov-17.
 */

import * as React from 'react';

import { Panel } from 'primereact/components/panel/Panel';

import { match } from 'react-router-dom';
interface NavParam {
    ref: number;
}
interface ReferenceCodeProps {
    match: match<NavParam>;
}
interface ReferenceCodeStates {}

export class ReferenceCodeComponent extends React.Component<ReferenceCodeProps, ReferenceCodeStates> {
    constructor(props: ReferenceCodeProps) {
        super(props);
    }

    public render (): JSX.Element {
        const refCodeStyle = {
            color: "#FF0000"
        } as React.CSSProperties;

        return (
            <Panel>
                <div className="ui-g">
                    <div className="ui-g-12">
                        <h3>
                            Referans Kodu:
                        </h3>
                    </div>
                    <div className="ui-g-12" style={refCodeStyle}>
                        <h3>
                            {this.props.match.params.ref}
                        </h3>
                    </div>

                </div>
            </Panel>
        );
    }
}
