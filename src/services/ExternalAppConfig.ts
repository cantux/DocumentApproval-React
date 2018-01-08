import * as rpn from 'request-promise-native';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

import ExternalAppConfig from '../models/ExternalAppConfig';

import Document from '../models/Document';

export class ExternalAppConfigService {

    public static documentsEndPoint: string =
        `${window.location.protocol}//${window.location.host}${process.env.ENDPOINT}`;

    private static mockExternalAppConfig: ExternalAppConfig = {
        customerMessage: 'Vatan krediniz yaninda ... limitli KMH hesabiniz da acilcaktir.',
        documentList: [
            {
                'approved': false,
                'detail': 'Basvuru formu ile ilgili açıklama.',
                'name': 'Basvuru Formu',
                'link': '/Basvuru Formu.pdf'
            },
            {
                'approved': false,
                'detail': 'Hizmet Sozlesmesi ile ilgili açıklama.',
                'name': 'Hizmet Sozlesmesi',
                'link': '/Hizmet Sozlesmesi.pdf'
            },
            {
                'approved': false,
                'detail': 'Kredi Sozlesmesi ile ilgili açıklama.',
                'name': 'Kredi Sozlesmesi',
                'link': '/Kredi Sozlesmesi.pdf'
            }
        ]
    };

    private static isMockBackend: boolean = process.env.USE_MOCK === 'true';

    public static getExternalAppConfig (referralId: string): Observable<ExternalAppConfig> {
        return ExternalAppConfigService.isMockBackend ?
            of(ExternalAppConfigService.mockExternalAppConfig).delay(3000)
            :
            fromPromise(
                ExternalAppConfigService.getExternalAppConfigPromise(
                    `${ExternalAppConfigService.documentsEndPoint}${referralId}`
                )
            );
    }

    public static getDocuments (referralId: string): Observable<Document[]> {
        return ExternalAppConfigService.getExternalAppConfig(referralId)
            .pluck('documentList');
    }

    private static getExternalAppConfigPromise (endPoint: string): Promise<ExternalAppConfig> {
        return rpn({
            uri: endPoint,
            json: true,
            jar: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public static postApproval (referralId: string, externalAppConfig: ExternalAppConfig) {
        return ExternalAppConfigService.isMockBackend ?
            of(Math.floor(100000 + Math.random() * 900000)).delay(3000)
            :
            fromPromise(
                ExternalAppConfigService.postApprovalPromise(
                    `${ExternalAppConfigService.documentsEndPoint}${referralId}`,
                    externalAppConfig
                )
            );
    }

    private static postApprovalPromise (endPoint: string, externalAppConfig: ExternalAppConfig): Promise<number> {
        return rpn({
            uri: endPoint,
            jar: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;  charset=utf-8'
            },
            body: JSON.stringify(externalAppConfig)
        });
    }
}
