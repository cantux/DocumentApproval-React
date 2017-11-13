"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Accordion_1 = require('primereact/components/accordion/Accordion');
var PdfViewerComponent_1 = require('./PdfViewerComponent');
var CheckboxComponent_1 = require("./CheckboxComponent");
// End of Types
var AccordionListComponent = (function (_super) {
    __extends(AccordionListComponent, _super);
    function AccordionListComponent(props) {
        _super.call(this, props);
        this.mockDocuments = [
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili açıklama.", "name": "Başvuru Formu", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/0?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.Döküman ile ilgili uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun uzuun açıklama.", "name": "Başvuru Formu", "documentLink": "https://www.google.com.tr/?gfe_rd=cr&dcr=0&ei=iiT8WcukCrOt8wfHw5qQAQ" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/1?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "fourth" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/2?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "sixth" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/3?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "eighth" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/4?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "tenth" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "https://fb000pc242.fibabanka.local:9444/InstantWeb/rs/docs/5?t=123" },
            { "downloaded": false, "detail": "Döküman ile ilgili açıklama.", "name": "Dokkuman", "documentLink": "twelweth" }];
        this.state = { allChecked: false, isValid: false, documents: [], lazy: false, activeAccordion: this.props.match.params.nodeId };
        this.sendApproval = this.sendApproval.bind(this);
        this.onDocumentReadChecked = this.onDocumentReadChecked.bind(this);
        this.onAccordionTabOpen = this.onAccordionTabOpen.bind(this);
        this.onAccordionTabClose = this.onAccordionTabClose.bind(this);
    }
    AccordionListComponent.prototype.componentWillMount = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.mockDocuments) {
                _this.setState({ isValid: true, documents: _this.mockDocuments });
            }
        }, 1000);
    };
    AccordionListComponent.prototype.sendApproval = function () {
        console.log('todo POST list');
    };
    AccordionListComponent.prototype.onDocumentReadChecked = function (key) {
        var _documents = this.state.documents;
        if (_documents[key]) {
            _documents[key].downloaded = !_documents[key].downloaded;
        }
        this.setState({ documents: _documents, allChecked: !_documents.some(function (value, index, array) { return (!value["downloaded"]); }) });
    };
    AccordionListComponent.prototype.onAccordionTabOpen = function (e) {
        console.log('open', e);
        this.setState({ activeAccordion: null });
    };
    AccordionListComponent.prototype.onAccordionTabClose = function (e) {
        console.log('close', e);
        this.setState({ activeAccordion: e.index });
    };
    AccordionListComponent.prototype.render = function () {
        var _this = this;
        var pdfViewItems = this.state.documents.map(function (item, index) {
            return (<Accordion_1.AccordionTab key={index} header={item.name}>

                    <PdfViewerComponent_1.PdfViewerComponent key={index} documentIndex={index} document={item} lazy={_this.state.activeAccordion === index}/>

                    <CheckboxComponent_1.CheckboxComponent document={item} documentIndex={index} onDocumentReadChecked={_this.onDocumentReadChecked}/>

                </Accordion_1.AccordionTab>);
        });
        return (<Accordion_1.Accordion onTabOpen={this.onAccordionTabOpen} onTabClose={this.onAccordionTabClose} activeIndex={this.state.activeAccordion}>
                {pdfViewItems}
            </Accordion_1.Accordion>);
    };
    return AccordionListComponent;
}(React.Component));
exports.AccordionListComponent = AccordionListComponent;
