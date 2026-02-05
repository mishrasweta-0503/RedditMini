import React from 'react'
import './App.css'
import Homepage from './pages/Homepage.jsx';
import Postdetail from './components/Postdetail.jsx';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.jsx'; //Layout will become the wrapper that always shows Sidebar + renders the active page in <Outlet />
import SearchResults from './components/SearchResults.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage/>} />
          <Route path="r/:subreddit" element={<Homepage />}/>
          <Route path="r/:subreddit/comments/:postId" element={<Postdetail />} />
          <Route path="search" element={<SearchResults />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
