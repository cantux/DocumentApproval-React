import * as React from 'react';

interface ErrorProps {};
interface ErrorStates {};

export class ErrorComponent extends React.Component<ErrorProps, ErrorStates> {
    constructor(props: ErrorProps) {
        super(props);
    }

    render () {
        return (
            <div> ERROR!! </div>
        )
    }
}