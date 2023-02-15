import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import {store} from './redux/store'

import { Layout } from './components/layout/layout';

import './index.css';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules';
import { ContractPage } from './pages/contract';
import { BookPage } from './pages/book';
import { BookLayout } from './components/layout/book-layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index={true} element={<MainPage />}/>
              <Route path='/books/' element={<MainPage />}/>
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
