import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar(){
    const[term,setTerm] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e){
        const url = `/search?q=${encodeURIComponent(term)}`;
        e.preventDefault()
        if(term){
            navigate(url)
        }
        setTerm('')
    }   
    return(
        <>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Search anything...' value={term} onChange={(e)=>{setTerm(e.target.value)}}/>
                </form>
            </div>
        </>
    )
}