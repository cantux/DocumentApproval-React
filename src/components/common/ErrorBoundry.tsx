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

        ErrorService.postError(new GenericError(error.message, '', JSON.stringify(errorInfo)));
    }

    render () {
        if (this.state.error) {
            return (<div>
                Sistemde bir hata olustu, lutfen musteri temsilcisinden yardim isteyiniz.

                <div className="ui-g">
                    <div className="ui-g-12">
                        Hata Ismi:
                        {this.state.error.name}
                    </div>
                    <div className="ui-g-12">
                        Hata Mesaji:
                        {this.state.error.message}
                    </div>
                    <div className="ui-g-12">
                        Hata ayrintisi:
                        {this.state.error.stack}
                    </div>

                </div>
            </div>);
        }
        return this.props.children;

    }
}
