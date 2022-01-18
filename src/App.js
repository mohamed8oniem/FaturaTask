import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layouts/Header/Header';

import Home from './components/Home/Home';
import Favourites from './components/Favourits/Favourites';
import Search from './components/Layouts/Search/Search';
import UploadGif from './components/Upload/Upload';
import UploadList from './components/Upload/UploadList';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Favourites" element={<Favourites />} />
            <Route path="/Search/:q" element={<Search />} />
            <Route path="/upload" element={<UploadGif />} />
            <Route path="/uploadList" element={<UploadList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
