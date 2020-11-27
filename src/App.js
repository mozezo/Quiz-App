import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from "../src/views/Layout/Layout";
import Loading from '../src/components/Loading/Loading';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { CSSTransition } from 'react-transition-group';

import './App.css';

//const store = configureStore();

function App() {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <Router>
            <Switch>
              <Suspense fallback={<Loading />}>
                {/* <CSSTransition
                  in={true}
                  appear={true}
                  timeout={1000}
                  classNames="fade"
                > */}
                  <Route path="/" name="Home" component={DefaultLayout} />
                {/* </CSSTransition> */}
              </Suspense>
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </Provider>

  );
}

export default App;
