import React from 'react';
import { Provider } from 'react-redux'; // redux store 사용
import Head from 'next/head';           // 페이지의 Head
import PropTypes from 'prop-types';     // Component와 store 검사
import AppLayout from '../components/AppLayout';
// redux
import reducer from '../reducers';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
// redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';


ToDoList.propTypes = {
    Component : PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
}

const ToDoList = ({ Component, store }) => {
    return(
        <Provider store={store}>
            <Head>
                <title>ToDoList</title>
                {/* antd 가져오기 */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </Provider>
    );
}
// redux settings
const configureStore = (initialState, options) => {
    // redux-saga 추가
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    // redux dev_tools 추가
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    // redux 이용
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
export default withRedux(configureStore)(ToDoList);