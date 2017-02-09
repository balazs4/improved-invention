import Inferno from 'inferno';

const load = () => {
    const App = require('./App').default;
    Inferno.render(<App />, document.getElementById('app'));
}

if (module.hot) {
    require('inferno-devtools');
    module.hot.accept();
    module.hot.accept('./App', load)
}

load();