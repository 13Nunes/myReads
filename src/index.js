// Basci
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Assets
import './index.css';

// Views
import Home from './views/Home/Home';
import Search from './views/Search/Search';

// UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

// UI :: Set pallete
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#135D90',
        },
        secondary: lightBlue,
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/search" component={Search} />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
