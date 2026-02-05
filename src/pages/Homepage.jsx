import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'; //useParams() lets Homepage read :subreddit from the URL.
import Postcard from '../components/Postcard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

//reddit has title/author_fullname in the form data.data.children.title

export default function Homepage(){
    const { subreddit } = useParams();
    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);
    const url = subreddit ? `/reddit/r/${subreddit}.json` : '/reddit/r/popular.json';
    

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.data.children); //result is the entire thing that we receive from reddit
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    },[url])

    return(
        <>
            <h4><FontAwesomeIcon icon={faFaceSmile} />{subreddit ? `Welcome to ${subreddit}` : 'Welcome to r/popular'}</h4>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {data.map(post => (<Postcard key={post.data.id} post={post.data}/>))} {/*post is the prop name which is passed to postcard*/}
            </ul>
        </>
    )
}