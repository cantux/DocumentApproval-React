import * as rpn from 'request-promise-native';

import {fromPromise} from 'rxjs/observable/fromPromise';

import Document from '../models/Document';

export class DocumentService {

//     import { DocumentService } from "../../services/DocumentRetriever";
// let x = new DocumentService();
// x.getDocuments(this.props.match.params.documentId)

    private endPoint: string = "";

    constructor (public isProd: boolean = process.env.NODE_ENV === 'production') {
        if(isProd) {
            this.endPoint = "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs?t="
        }
        else {
            this.endPoint = `${process.env.PUBLIC_URL}/documents.json`
        }
    }

    public getDocuments (referralId: number) {
        return fromPromise(rpn({
            uri: `${this.endPoint}${referralId}`,
            json: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }))
    }

    public postApproval (referralId: number, documents: Document[]) {
        return fromPromise(rpn({
            uri: `${this.endPoint}${referralId}`,
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documents)
        }))
    }
}