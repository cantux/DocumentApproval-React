{/*<div id="viewerContainer">*/}
{/*<div id="viewer"></div>*/}
{/*</div>*/}
{/*<footer>*/}
{/*<button className="toolbarButton pageUp" title="Previous Page" id="previous"></button>*/}
{/*<button className="toolbarButton pageDown" title="Next Page" id="next"></button>*/}
{/*</footer>*/}

// // Any copyright is dedicated to the Public Domain.
// // http://creativecommons.org/licenses/publicdomain/
//
// // Hello world example for webpack.
//
// var pdfjsLib = require('pdfjs-dist') ;
//
// // Setting worker path to worker bundle.
// pdfjsLib.PDFJS.workerSrc = '../../build/webpack/pdf.worker.bundle.js';
//
// // It is also possible to disable workers via `PDFJS.disableWorker = true`,
// // however that might degrade the UI performance in web browsers.
//
// // Loading a document.
//
// export class PDFViewerApplication {
//     pdfDocument =  null;
//     pdfViewer =  null;
//     pdfLinkService = null;
//
//     constructor () {
//         var linkService = new pdfjsLib.PDFJS.PDFLinkService();
//         this.pdfLinkService = linkService;
//
//         var container = document.getElementById('viewerContainer');
//         var pdfViewer = new pdfjsLib.PDFJS.PDFViewer({
//             container: container,
//             linkService: linkService,
//             l10n: pdfjsLib.PDFJS.NullL10n,
//         });
//         this.pdfViewer = pdfViewer;
//         linkService.setViewer(pdfViewer);
//
//         document.getElementById('previous').addEventListener('click', () => {
//             this.page--;
//         });
//
//         document.getElementById('next').addEventListener('click', () => {
//             this.page++;
//         });
//
//         container.addEventListener('pagechange', (evt:any) => {
//             var page = evt.pageNumber;
//             var numPages = this.pagesCount;
//
//             (document.getElementById('pageNumber') as any).value = page;
//             (document.getElementById('previous')as any).disabled = (page <= 1);
//             (document.getElementById('next')as any).disabled = (page >= numPages);
//         }, true);
//     }
//
//     open () {
//         var pdfPath = './iki_sayfa.pdf';
//         var loadingTask = pdfjsLib.getDocument(pdfPath);
//         var self = this;
//         loadingTask.promise.then((pdfDocument: any) => {
//             // Request a first page
//             return pdfDocument.getPage(1).then((pdfPage) => {
//
//                 this.pdfViewer.setDocument(pdfDocument);
//
//
//                 // Display page on the existing canvas with 100% scale.
//                 var viewport = pdfPage.getViewport(1);
//                 var container = document.getElementById('pdf-view');
//                 var scale = container.clientWidth / viewport.width;
//                 viewport = pdfPage.getViewport(scale);
//
//
//                 var canvas = document.getElementById(canvasId);
//                 canvas.width = viewport.width;
//                 canvas.height = viewport.height;
//                 var ctx = canvas.getContext('2d');
//
//                 var renderTask = pdfPage.render({
//                     canvasContext: ctx,
//                     viewport: viewport
//                 });
//
//                 return renderTask.promise;
//             });
//         }).catch(function (reason) {
//             console.error('Error: ' + reason);
//         });
//     }
//
//     get pagesCount() {
//         return this.pdfDocument.numPages;
//     }
//
//     set page(val) {
//         this.pdfViewer.currentPageNumber = val;
//     }
//
//     get page() {
//         return this.pdfViewer.currentPageNumber;
//     }
// }
