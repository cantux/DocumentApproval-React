import * as React from 'react';

import { ErrorService, GenericError } from '../../services/ErrorTransmitter';

interface ErrorProps {
    message: string
}

export const ErrorComponent: React.SFC<ErrorProps>  = (props: ErrorProps) => {
  ErrorService.postError(new GenericError(props.message,'','Hata gosterildi.'));
    return (
        <div> {props.message}</div>
    );
}
