import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

import Document from '../models/Document';

import { ExternalAppConfigService } from './ExternalAppConfig';

export class DocumentService {

    public static getDocuments (referralId: string): Observable<Document[]> {
        return DocumentService.getDocumentsFromExternalAppConfig(referralId);
    }

    private static getDocumentsFromExternalAppConfig(referralId: string): Observable<Document[]> {
        return ExternalAppConfigService.getDocuments(referralId);
    }

    public static postApproval (referralId: string, documents: Document[]) {
        return ExternalAppConfigService.postApproval(
                referralId,
                {customerMessage: '', documentList: documents}
            );
    }
}
