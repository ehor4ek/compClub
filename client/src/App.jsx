import Main from './Main.jsx';
import Autorize from './Autorize.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import React from 'react';
import Contacts from './Contacts.jsx';
import Account from './Account.jsx';
import Actions from './Actions.jsx';
// import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-router';
import 'history';

export default function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="wrap">
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/contacts" exact element={<Contacts />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/autorize" exact element={<Autorize />} />
            <Route path="/account" exact element={<Account />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}