/**
 * Created by cantu on 13-Nov-17.
 */

import * as React from 'react';

import { Button } from 'primereact/components/button/Button';
import { Panel } from 'primereact/components/panel/Panel';

interface ApprovalProps { allChecked: boolean}
interface ApprovalStates {}

export class ApprovalComponent extends React.Component<ApprovalProps, ApprovalStates> {
    constructor(props: ApprovalProps) {
        super(props);
        this.state = {allChecked: false}
        this.sendApproval = this.sendApproval.bind(this);
    }

    sendApproval () {
        console.log('todo POST list')
    }

    public render (): JSX.Element {
        return (
            <Panel>
                <div className="ui-g">
                    <div className="ui-g-12">
                        <Button
                            onClick={this.sendApproval}
                            label={"Onayı Gönder"}
                            icon={"fa-arrow-right"}
                            iconPos={"right"}
                            disabled={!this.props.allChecked}
                        />
                    </div>
                </div>
            </Panel>
        );
    }
}
