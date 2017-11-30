var pdfjsLib = require('pdfjs-dist');
import { ErrorService, GenericError } from "../../../services/ErrorTransmitter";

// Setting worker path to worker bundle.
pdfjsLib.PDFJS.workerSrc = process.env.PUBLIC_URL + '/pdf.worker.min.js';

// It is also possible to disable workers via `PDFJS.disableWorker = true`,
// however that might degrade the UI performance in web browsers.

// Loading a document.

export function load(viewId, pdfPath, zoomScale) {
    var loadingTask = pdfjsLib.getDocument(pdfPath);
    var self = this;

    loadingTask.promise.then(function (pdfDocument) {
        var container = document.getElementById('pdf-container' + viewId);
        // var prevCanvasElems = container.getElementsByTagName('canvas');
        // while(prevCanvasElems[0]){
        //     prevCanvasElems[0].parentNode.removeChild(prevCanvasElems[0])
        // }

        // Request a first page
        for(var i = 1; i <= pdfDocument.numPages; i++) {
            pdfDocument.getPage(i).then(function (pdfPage) {
                var viewport = pdfPage.getViewport(1);

                var pageCanvas = document.createElement('canvas');
                pageCanvas.id = 'pdf-' + viewId + '-page-' + i;

                container.appendChild(pageCanvas);

                // var scale = container.clientWidth / viewport.width;
                // console.log('scale is: ', scale * 2);
                viewport = pdfPage.getViewport(zoomScale);

                pageCanvas.width = viewport.width;
                pageCanvas.height = viewport.height;

                var ctx = pageCanvas.getContext('2d');

                var renderTask = pdfPage.render({
                    canvasContext: ctx,
                    viewport: viewport
                });
                return renderTask.promise;
            }).catch(function (reason) {
              var errorDiv = document.createElement('div');
              errorDiv.innerText = "Pdf oluşturulması sırasında hata ile karşılaşıldı. Sürece kasadan devam ediniz";
              container.appendChild(errorDiv);
              ErrorService.postError(new GenericError('pdf get page promise catch!!!', 0, JSON.stringify(reason)));
            });
        }
    }).catch(function (reason) {
      var errorDiv = document.createElement('div');
      errorDiv.innerText = "Pdf oluşturulması sırasında hata ile karşılaşıldı. Sürece kasadan devam ediniz";
      container.appendChild(errorDiv);
      ErrorService.postError(new GenericError('loading task promise catch!!!', 0, JSON.stringify(reason)));
    });
}
