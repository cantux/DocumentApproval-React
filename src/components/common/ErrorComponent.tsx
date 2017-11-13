import * as React from 'react';

interface ErrorProps {
    message: string
}
interface ErrorStates {}

export class ErrorComponent extends React.Component<ErrorProps, ErrorStates> {
    constructor(props: ErrorProps) {
        super(props);
    }

    render () {
        return (
            <div> Hata!! {this.props.message}</div>
        );
    }
}