import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import '../css/app.css'

document.body.style.backgroundColor = "#0c1e35"

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
