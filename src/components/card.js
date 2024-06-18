import React, {useEffect} from 'react';
import {useState} from 'react'
import '../cards.css';

/*Card.js
* Card function returns a 'card' representation of each Pokemon with basic info 
*/

export function Card(props) {
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [img, setImg] = useState([]);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [chibi, setChibi] = useState("");

    //colors object used to map color name to value
    const colors = {
        //this colors object was gotten with the help from someone on github who had all types and colors listed for pokemon
        //I changed some of the color values to be more fitting for me
        //Reference: https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
        water: '#6390F0',
        normal: '#FFFCF7',
        fire: '#FA675C',
        electric: '#F7D02C',
        ice: '#96D9D6',
        steel: '#B7B7CE',
        fairy: '#D685AD',
        fighting: '#C22E28',
        poison: '#c897db',
        ground: '#E2BF65',
        flying: '#D9F4FF',
        psychic: '#F95587',
        bug: '#A6B91A',
        grass: '#7AC74C',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
    };
    const handleFetch = (response) => {
        return response.json();
    }
    const handleResponse = (response) => {
        const respPok = 
        <>
            <img src={response.sprites.front_default} alt="img of pokemon"/>
            <img src={response.sprites.front_shiny} alt="shiny img of pokemon"/>
        </>;
        const respChibi = response.sprites.back_default;
        const ab = response.abilities.map((ab) => <li>{ab.ability.name}</li>);
        const tp = response.types.map((t) => <p style={{border: '2px solid', borderRadius: '25px', padding: '20px', backgroundColor: colors[t.type.name]}}><b>{t.type.name}</b></p>);
        setChibi(respChibi);
        setId(response.id);
        setImg(respPok);
        setHeight(response.height);
        setWeight(response.weight);
        setTypes(tp);
        setAbilities(ab);
    }

    useEffect(() => {
        setName(props.name);
        const url = props.url;
        fetch(url)
        .then(handleFetch)
        .then(handleResponse);
    }, [])

    //Returns card output for each Pokemon 
    return(
        <div className='card'>
            <p style={{textAlign: 'left', padding: '10px'}}><b>#{id}</b></p>
            <p style={{fontSize: '30px'}}><b><u>{name}</u></b></p>
            <p>{types}</p>
            <p>{img}</p>
            <div style={{border: '2px solid', borderRadius: '25px', padding: '5px'}}>
            <p><b>Height: {height}</b></p>
            <p><b>Weight: {weight}</b></p>
            <p><b>Abilities:</b></p>
            <ol style={{textAlign: 'center', padding: '5px', listStylePosition: 'inside'}}><b>{abilities}</b></ol>
            </div>
            <button style={{margin: '15px'}} onClick={() => props.c(name, chibi)}>Add to Team</button>
        </div>
    );
}