import * as rpn from 'request-promise-native';

import { fromPromise } from 'rxjs/observable/fromPromise';

import GenericError from '../models/Error';

class ErrorService {

    public static errorEndPoint: string =
        `${window.location.protocol}//${window.location.host}/InstantWeb/rs/docs?t=`;

    private static isMockBackend: boolean = process.env.USE_MOCK === 'true';

    public static postError (error: GenericError) {
        return ErrorService.isMockBackend ?
            console.log('mock error service: ', error.dump())
            :
            fromPromise(
                ErrorService.postErrorPromise(
                    `${ErrorService.errorEndPoint}`,
                    error.dump()
                )
            );
    }

    private static postErrorPromise (endPoint: string, error: any): Promise<number> {
        return rpn({
            uri: endPoint,
            json: true,
            jar: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(error)
        });
    }
}

export {
    GenericError,
    ErrorService
}
