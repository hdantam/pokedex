import './App.css';
import React, {useEffect} from 'react';
import {useState} from 'react'
import {Pokemon} from './components/pkmn.js'
import {set, onValue, remove, ref, off} from 'firebase/database';
import {database} from './database';
import {uid} from 'uid';
import pokeball from './pngegg.png';

/* App.js
* Main App component under which everything else runs 
*/

function App() {
  const [count, setCount] = useState();
  const [team, setTeam] = useState([]);

  //Remove Pokemon from team
  const deleteData = (r) => {
    console.log(`attempting to delete index ${r} `);
    const dataRef = ref(database, `/${r}`);
    remove(dataRef)
    .then(() => console.log("remove successful"))
    .catch((error) => console.log("remove failed"));
  }

  //Create new team Pokemon given name and alt image of it
  const createData = (n, im) => {
    const date = new Date().toISOString();
    const uuid = uid();
    let data = {
        name: n,
        image: im,
        date: date,
        uid: uuid,
    }
    console.log(data);
    const datRef = ref(database, `/${uuid}`);
    set(datRef, data)
    .then(() => {
      console.log("Finished creating data");
    })
    .catch((error) => console.log("Set failed"));
  }

  //Reads in Pokemon initially (and onValue updates screen whenever changes occur in database)
  useEffect(() => {
    const dataRef = ref(database, '/');
    onValue(dataRef, (snap) => {
        setTeam([]);
        setCount(snap.size);
        const dat = snap.val();
        if (snap.exists()) {
          console.log(snap.val())
          Object.values(dat).map((val) => {
            setTeam((oldTeam) => [...oldTeam, val]);
          })
        }
    });
    return () => {
        const dataRef = ref(database, '/');
        off(dataRef);
        console.log("Turned off listener");
    }
  }, []);

  //Return Main App Page
  return (
    <div className="App">
      <div className="header">
        <h1 style={{border: '2px solid',fontFamily: 'sans-serif', margin: '0px', padding: '20px', fontSize: '50px'}}><img style={{width: '70px', height: '70px', float:'left'}} src={pokeball} alt="pokeball"/>Pokedex Teambuilder App</h1>
      </div>
      <h3 style={{border: '2px solid', borderRadius: '20px', padding: '20px', width: '50%', margin: 'auto', marginTop: '20px'}}>Developed by Hemant Dantam during Software Saturdays</h3>
      <h3>Current Team:</h3>
      <div className='AppContainer'>
      {team.map((t) => (
        <div className='teamBox'>
          <h4>{t.name}</h4>
          <img style={{alignSelf: 'center'}} src={t.image} alt="img"/>
          <h6>Added to team on: {t.date}</h6>
          <button onClick={() => deleteData(t.uid)}>Remove from Team</button>
        </div>
      ))}
      </div>
      {count < 6?<h3><u>Listed below are all Pokemon with the option of selecting {6 - count} more to put on your team</u></h3>:<p></p>}
      {count < 6?<Pokemon c={createData} ct={count}/>:<h3 style={{padding: '20px', margin: '0px'}}>You have made your team of 6 Pokemon! Remove one if you want to continue searching</h3>}
    </div>
  );
}

export default App;
