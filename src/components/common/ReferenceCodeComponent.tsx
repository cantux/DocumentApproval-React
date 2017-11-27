/**
 * Created by cantu on 13-Nov-17.
 */

import * as React from 'react';

import { Panel } from 'primereact/components/panel/Panel';

import { Location } from 'history';
interface ReferenceCodeProps {
    location: Location;
}
interface ReferenceCodeStates {}

export class ReferenceCodeComponent extends React.Component<ReferenceCodeProps, ReferenceCodeStates> {
    constructor(props: ReferenceCodeProps) {
        super(props);
    }

    public render (): JSX.Element {
        const refCodeStyle = {
            color: '#FF0000'
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
                            {this.props.location.state.referenceCode}
                        </h3>
                    </div>

                </div>
            </Panel>
        );
    }
}
