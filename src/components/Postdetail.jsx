//this component will consist of subreddit name, author name, title, full selftext(not truncated), upvotes+comments counts
//thumbnail + preview

import React,{useEffect,useState} from 'react';
import { Routes, Route, Link, useParams,useNavigate } from 'react-router-dom';
import Comment from './Comment.jsx';

export default function Postdetail(){
    let { subreddit,postId } = useParams();
    const[postdetail, setPostDetail] = useState(null);
    const[comments, setComments] = useState([]);
    const[replies, setReplies] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);

    const imageUrl = postdetail?.preview?.images?.[0]?.source?.url
    ?.replace(/&amp;/g, "&");
    let hostname = null;
    if(postdetail?.url){
        try {
            hostname = new URL(postdetail.url).hostname
        } catch (error) {
            hostname = null;
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`,{
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Reddit API responded with status: ${response.status}`);
                }
                const result = await response.json();
                //console.log('Output of result: ', result)
                setPostDetail(result[0]?.data?.children?.[0]?.data);
                setComments(result[1]?.data?.children?? []);
                console.log('result: ',result)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData();
    },[postId])
    return(
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {postdetail && (
                <>
                    <h4>r/{postdetail.subreddit} . {postdetail.author}</h4>
                    {<h3>{postdetail.title}</h3>}
                    <div className='selftext'>
                        {postdetail.selftext ? (<p>{postdetail.selftext}</p>) : (hostname && <a href={postdetail.url} target="_blank">{hostname}</a>)}
                    </div>
                    {imageUrl && (
                        <div className="image-preview-img">
                        <img src={imageUrl} alt="Post preview" />
                        </div>
                    )}
                    <h5>Comments</h5>
                    {comments && comments.map(item => (
                        <Comment key={item.data.id} item={item}/>
                    ))}
                </>
            )}
        </>
    )

}