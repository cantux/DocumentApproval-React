import * as rpn from 'request-promise-native';

import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';

import Document from '../models/Document';

export class DocumentService {

    private static mockDocuments : Document[] = [
        {"approved": false, "detail": "Basvuru formu ile ilgili açıklama.", "name": "Basvuru Formu", "link": "/Basvuru Formu.pdf"},
        {"approved": false, "detail": "Hizmet Sozlesmesi ile ilgili açıklama.", "name": "Hizmet Sozlesmesi", "link": "/Hizmet Sozlesmesi.pdf"},
        {"approved": false, "detail": "Kredi Sozlesmesi ile ilgili açıklama.", "name": "Kredi Sozlesmesi", "link": "/Kredi Sozlesmesi.pdf"},
    ];

    private static isMockBackend: boolean = process.env.USE_MOCK === 'true';

    public static documentsEndPoint: string = `${window.location.protocol}//${window.location.host}/InstantWeb/rs/docs?t=`

    public static getDocuments (referralId: string) : Observable<Document[]> {
        return DocumentService.isMockBackend ?
            of(DocumentService.mockDocuments).delay(3000)
            :
            fromPromise(DocumentService.getDocumentsPromise(`${DocumentService.documentsEndPoint}${referralId}`))
    }

    private static getDocumentsPromise (endPoint: string): Promise<Document[]> {
        return rpn({
            uri: endPoint,
            json: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public static postApproval (referralId: string, documents: Document[]) {
        return DocumentService.isMockBackend ?
            of(123456).delay(3000)
            :
            fromPromise(DocumentService.postApprovalPromise(`${DocumentService.documentsEndPoint}${referralId}`, documents))
    }

    private static postApprovalPromise (endPoint: string, documents: Document[]) : Promise<number> {
        return rpn({
            uri: endPoint,
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documents)
        });
    }
}