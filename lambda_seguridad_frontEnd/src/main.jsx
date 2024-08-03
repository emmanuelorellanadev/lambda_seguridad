import React from 'react';
import ReactDOM from 'react-dom/client'

import { App } from './App.jsx'
import FrameProvider from './context/FrameContext.jsx';
import { SubMenuProvider } from './context/SubMenuContext.jsx';

const root = ReactDOM.createRoot( document.getElementById('root') );
root.render(
    <React.StrictMode>
        <SubMenuProvider>
            <FrameProvider>
                <App />
            </FrameProvider>
        </SubMenuProvider>
    </React.StrictMode>
)