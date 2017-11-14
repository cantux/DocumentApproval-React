// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Hello world example for webpack.

var pdfjsLib = require('pdfjs-dist');

// Setting worker path to worker bundle.
pdfjsLib.PDFJS.workerSrc = process.env.PUBLIC_URL + '/pdfjs-dist/build/pdf.worker.js';

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
            });
        }
    }).catch(function (reason) {
        console.error('viewer.js error: ' + reason);
    });
}
