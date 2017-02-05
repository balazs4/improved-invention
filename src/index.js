import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const _render = MyApp => {
    render(
        <AppContainer>
            <MyApp />
        </AppContainer>,
        document.getElementById('app')
    )
}

_render(App);

if (module.hot) module.hot.accept('./App', () => { _render(App); })