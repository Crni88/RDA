import React from 'react'
import spinner from './Bean Eater-1.2s-221px.gif';
export default function Spinner() {
    return (
        <div>
            <img 
            src={spinner} 
            alt="Loading..."
            style={{width:"200px",margin:"auto",display:"block"}}></img>
        </div>
    )
}
