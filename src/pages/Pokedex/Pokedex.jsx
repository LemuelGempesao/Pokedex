
import './Pokedex.css'
import { useState, useEffect } from 'react'
import { logo, location } from '../../constants/index'


const Pokedex = () => {

  const defaultPokemon = {
    name: "?",
    sprites: {
      front_default: "",
      front_shiny: "",
    },
    id:0,
    weight:0

  }

  const [pokemon, setPokemon] = useState(defaultPokemon);

  const [fetching, setFetching] = useState("");
  const [pokemonName, setPokemonName] = useState("");


  useEffect(()=>{

    const handleEnter = (event) =>{
      if(event.key == 'Enter'){
        fetchPokemon();
      }
    }
  
  document.addEventListener("keydown", handleEnter);


  return()=>{
    document.removeEventListener("keydown", handleEnter)
  }
  



  }, [pokemonName]);


  const fetchPokemon = async () => {

    try {


      if (pokemonName.trim() == "") {
        throw new Error("Empty");
      }


      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLocaleLowerCase()}`);

      if (!res.ok) {
        throw new Error(`Couldn't Find Pokemon ${pokemonName}`);
      }

      setFetching(`Found ${pokemonName.slice(0,1).toUpperCase()+pokemonName.slice(1)}`);
      const data = await res.json();
      setPokemon(data);
      setPokemonName("");

    }

    catch (error) {
      setFetching(error.message);
      setPokemonName("");
      setPokemon(defaultPokemon)

    }


  }






  return (
    <div className='pokedex'>

      <div className="container">
      <div className="pokemon-details">
        <h1 className='pokemon-name'><img width="25" height="25" src={location} />{pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}</h1>

        <div className="sprites">
          <img
            className='Image'
            src={pokemon.sprites.front_default}
            alt={pokemon.name == "?" ? "" : pokemon.name} />

          <img
            className='Image'
            src={pokemon.sprites.front_shiny}
            alt={pokemon.name == "?" ? "" : pokemon.name} />

        </div>

        <div className="pokemon-specs">
          <h2 className='number'>No.: {pokemon.id}</h2>
          <h2 className='weight'>Weight:{ pokemon.weight}lbs</h2>



        </div>



      </div>



      <div className="search-container">
        <input
          className='search-bar'
          value={pokemonName}
          type="text"
          onChange={(event) => { setPokemonName(event.target.value) }}
          placeholder='Search Pokemon' />

        <button className="find-btn" onClick={fetchPokemon}><img src={logo} /></button>
        <h1 className='status'><span>Status: </span> {fetching}</h1>

      </div>


      </div>

      


    </div>
  )
}

export default Pokedex