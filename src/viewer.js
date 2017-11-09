// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Hello world example for webpack.

var pdfjsLib = require('pdfjs-dist');

// Setting worker path to worker bundle.
pdfjsLib.PDFJS.workerSrc = '../../build/webpack/pdf.worker.bundle.js';

// It is also possible to disable workers via `PDFJS.disableWorker = true`,
// however that might degrade the UI performance in web browsers.

// Loading a document.

export function load(viewId) {
    var pdfPath = './iki_sayfa.pdf';
    var loadingTask = pdfjsLib.getDocument(pdfPath);
    var self = this;

    loadingTask.promise.then(function (pdfDocument) {
        // Request a first page
        for(var i = 1; i <= pdfDocument.numPages; i++) {
            pdfDocument.getPage(i).then(function (pdfPage) {

                var viewport = pdfPage.getViewport(1);

                var container = document.getElementById('pdf-container' + viewId);

                var pageCanvas = document.createElement('canvas');
                pageCanvas.id = 'pdf-' + viewId + '-page-canvas-' + i;
                container.appendChild(pageCanvas);

                var scale = container.clientWidth / viewport.width;
                console.log('scale is: ', scale);
                viewport = pdfPage.getViewport(scale);

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
        console.error('Error: ' + reason);
    });

}
