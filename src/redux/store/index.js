import { createStore, applyMiddleware, compose } from 'redux';
//import createSagaMiddleware from 'redux-saga';
import { persistStore} from 'redux-persist'

//import rootSaga from '../saga';

import rootReducer from '../reducers';

// export const configureStore = () => {
//     //const sagaMiddleware = createSagaMiddleware(); 
//     const store = createStore(
//         rootReducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__
//             ? compose(
//                   //applyMiddleware(sagaMiddleware),
//                   window.__REDUX_DEVTOOLS_EXTENSION__(),
//               )
//             : ''
//             //applyMiddleware(sagaMiddleware),
//     );
//     //sagaMiddleware.run(rootSaga);
//     return store;
// };

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
          //applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
    : ''
    //applyMiddleware(sagaMiddleware)
    ,);
//sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default {store, persistor};