import * as React from 'react';

interface ErrorProps {
    message: string
}

export const ErrorComponent: React.SFC<ErrorProps>  = (props: ErrorProps) => {
    return (
        <div> {props.message}</div>
    );
}