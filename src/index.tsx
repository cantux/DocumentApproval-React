import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import { GenericError, ErrorService } from './services/ErrorTransmitter';

window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = "script error";
  if (string.indexOf(substring) > -1){
    ErrorService.postError(new GenericError('script error, you done goofed son!!', '', ''));
  } else {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ');

    ErrorService.postError(new GenericError(message, '', ''));
  }

  return false;
};

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

