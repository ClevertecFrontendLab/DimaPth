import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { BookLayout } from './components/layout/book-layout';
import { Layout } from './components/layout/layout';
import { BookPage } from './pages/book';
import { ContractPage } from './pages/contract';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules';
import {store} from './redux/store'

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index={true} element={<MainPage />}/>
              <Route path='/books/:category' element={<MainPage />}/>
              <Route path='/rules' element={<RulesPage />}/>
              <Route path='/contract' element={<ContractPage />}/>
            </Route>
            <Route path='/books/:category/:bookId' element={<BookLayout />}>
              <Route index={true} element={<BookPage />}/>
            </Route>
          </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
