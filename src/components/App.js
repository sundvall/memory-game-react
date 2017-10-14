import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../logo.svg';
import '../App.css';
import '../scss/style.css';
import Board from './Board.js';
import { fooActionCreator } from '../ducks/foo.js';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fooActionCreator());
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Reacto</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <Board rows={4} cols={4}/>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    foo: state.foo,
});

export default connect(mapStateToProps)(App);

// export default App;
