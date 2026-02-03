import React, { useEffect,useState } from 'react';
import Postcard from '../components/Postcard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

//reddit has title/author_fullname in the form data.data.children.title

export default function Homepage(){
    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/reddit/r/popular.json');
                const result = await response.json();
                setData(result.data.children); //result is the entire thing that we receive from reddit
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return(
        <>
            <h4><FontAwesomeIcon icon={faFaceSmile} />Welcome To Mini Reddit</h4>
            {loading && <p>Loading News...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {data.map(post => (<Postcard key={post.data.id} post={post.data}/>))} {/*post is the prop name which is passed to postcard*/}
            </ul>
        </>
    )
}