import React, {useEffect} from 'react';
import {useState} from 'react'
import {Card} from './card'
import '../cards.css';

/*Pokemon.js
* Pokemon function reads data from Api 
* Returns lists of cards respresenting each Pokemon 
*/

export function Pokemon(props) {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(18);
    const handleFetch = (response) => {
        console.log(response.status);
        return response.json();
    }
    const handleResponse = (response) => {
        const respPok = response.results.map((item) => 
            <Card name = {item.name.charAt(0).toUpperCase() + item.name.slice(1)} url = {item.url} c = {props.c} ct={props.ct}/>
        );
        setPokemon(respPok);
    }
    const handleError = (error) => {
        console.log(error);
    }
    const handleLoad = () => {
        setOffset(offset + 18);
        getAPIDat();
    }
    const getAPIDat = async() => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${offset}&offset=0`;
        fetch(url)
        .then(handleFetch)
        .then(handleResponse)
        .catch(handleError)
    }

    useEffect(() => {
        getAPIDat();
    }, [])

    return (
        <>
        <div className='container'>
            {pokemon}
        </div>
        <button onClick={handleLoad}>Load More</button>
        </>
    )
}