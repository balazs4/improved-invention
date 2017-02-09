import { h, render } from 'preact';

let root;
const load = () => {
    const App = require('./App').default;
    root = render(<App />, document.body, root);
}

load();
if (module.hot) {
    require('preact/devtools');
    module.hot.accept();
    module.hot.accept('./App', load)
}