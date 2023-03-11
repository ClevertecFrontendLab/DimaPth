import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { SignUp } from './components/auth/registration';
import { Auth } from './components/auth/auth';
import { ForgotPass } from './components/auth/forgot-pass';
import { BookLayout } from './components/layout/book-layout';
import { Layout } from './components/layout/layout';
import { BookPage } from './pages/book';
import { ContractPage } from './pages/contract';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules';
import { store, persistor } from './redux/store'

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
              <Route path='/auth' element={<Auth />}/>
              <Route path='/registration' element={<SignUp />}/>
              <Route path='/forgot-pass' element={<ForgotPass />}/>
            </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
