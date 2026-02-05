import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Postcard from './Postcard';

export default function SearchResults(){
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const [results,setResults] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    useEffect(()=>{
        const fetchTerm = async() => {
            try {
                if(q === null || q === '' || q.trim() === ''){
                    setResults([])
                    setError(null)
                    setLoading(false)
                    return
                }else{
                    setLoading(true);
                    setError(null);
                    const response = await fetch(`/reddit/search.json?q=${encodeURIComponent(q)}`);
                    const result = await response.json();
                    setResults(result.data.children);
                }                
            } catch (error) {
                setError(error);
                
            } finally{
                setLoading(false);
            }
        }
        fetchTerm();
    },[q])
    return(
        <>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!loading && !error && results.length === 0 && <p>No results</p>}
                {results && results.map(result => (<Postcard key={result.data.id} post={result.data}/>))}
            </div>
        </>
    )
    
}