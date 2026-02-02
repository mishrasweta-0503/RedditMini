//this component will consist of subreddit name, author name, title, full selftext(not truncated), upvotes+comments counts
//thumbnail + preview

import React,{useEffect,useState} from 'react';
import { Routes, Route, Link, useParams,useNavigate } from 'react-router-dom';

export default function Postdetail(){
    let { subreddit,postId } = useParams();
    return(
        <>
            <h1>Welcome to Post Details page</h1>
            <p>Subreddit : {subreddit}</p>
            <p>PostId : {postId}</p>
        </>
    )

}