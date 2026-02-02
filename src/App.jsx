import React from 'react'
import './App.css'
import Homepage from './pages/Homepage.jsx';
import Postdetail from './components/Postdetail.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/r/:subreddit/comments/:postId" element={<Postdetail />} />
      </Routes>
    </>
  )
}

export default App
