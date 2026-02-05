//this component creates creates the url(detailpath). The detailpath matches the route defined in App.jsx
//detailpath becomes the URL in the address bar.
//when the user clicks on the link, React Router updates the browser URL, it finds the route pattern defined in App.jsx.
//React Router extracts params
//React Router renders <Postdetail />(and in Postdetail, we can see the values of subreddit and postid)



import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Postcard({post}){
    const detailPath = `/r/${post.subreddit}/comments/${post.id}`;
    const [upvote,setUpvote] = useState(post.ups);
    const [hasUpvoted,sethasUpvoted] = useState(false);

    function increaseUpvote(){
        if(hasUpvoted === true){
            sethasUpvoted(false)
            setUpvote(prev => prev - 1)
        } else {
            setUpvote(prev => prev + 1)
            sethasUpvoted(true)
        }
    }

    const imageUrl = post.preview?.images?.[0]?.source?.url
    ?.replace(/&amp;/g, "&");
    let hostname = null;
    if(post.url){
        try {
            hostname = new URL(post.url).hostname
        } catch (error) {
            hostname = null;
        }
    }
    return(
        <>
            <div className='card-container'>
                <h4>r/{post.subreddit} . {post.author}</h4>
                <h3><Link to={detailPath}>{post.title}</Link></h3>
                <div className='selftext'>
                    {post.selftext ? (<p>{post.selftext}</p>) : (hostname && <a href={post.url} target="_blank">{hostname}</a>)}
                </div>
                <div className='image-preview-img'>
                    {imageUrl && (
                        <img src={imageUrl} alt="Post preview"/>
                    )}
                </div>
                <div className='stats'>
                    <button onClick={increaseUpvote}><FontAwesomeIcon icon={faUpLong}/>{upvote}</button>
                    <button><FontAwesomeIcon icon={faComment} /><Link to={detailPath}>{post.num_comments}</Link></button>
                </div>
            </div>
        </>
    )
}