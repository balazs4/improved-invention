import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';



const _render = () => {
    const App = require('./App').default;
    render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('app')
    )
}

_render();

if (module.hot){
    module.hot.accept();
    module.hot.accept('./App', _render);
}