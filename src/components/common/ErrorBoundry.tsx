import * as React from 'react';

import { GenericError, ErrorService } from '../../services/ErrorTransmitter';

// Types
interface ErrorBoundryProps {}
interface ErrorBoundryState {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundryProps, ErrorBoundryState> {
    constructor(props: ErrorBoundryProps) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Catch errors in any child components and re-renders with an error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        ErrorService.postError(new GenericError('React error', '', JSON.stringify(errorInfo)));
    }

    render () {
        console.log('error boundry render: ', this.state.error);
        if (this.state.error) {
            console.log('error boundry error truthy');
            return (<div>
                Merhaba sistemde bir hata olustu, lutfen musteri temsilcisinden yardim isteyiniz.

                <div className="ui-g">
                    <div className="ui-g-12">
                        Hata:
                        {this.state.error}
                    </div>
                    <div className="ui-g-12">
                        Hata ayrintisi:
                        {this.state.error}
                    </div>
                </div>
            </div>);
        }
        console.log('error boundry error false');
        return this.props.children;

    }
}