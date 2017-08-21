import * as React from "react";
import * as ReactDOM from "react-dom";

import Main from './containers';

import './stores/article_store';
import './services/http_service';
import './utils/url_checker';

// Render the main app react component into the document body.
let div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Main />, div);
