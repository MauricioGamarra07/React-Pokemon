import { useEffect, useState } from 'react';
import './App.css'
import Cards from './assets/components/Cards'
import Switch from './assets/components/Switch'

function App() {

  const [datosPokemon, setDatosPokemon] = useState([]);

  const [pokemon, setPokemon] = useState([]);

  const [arrayCartas, setArrayCartas] = useState([]);

  const fetchPokemones = async (limite = 4) => {
    const random = Math.random() * 1000;
    const inicio = Math.floor(random);
    /* console.log(inicio); */
    let enlace = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${enlace}pokemon?limit=${limite}&offset=${inicio}`)
    const datos = await res.json();

    /* console.log(datos.results) */

    const array = [];
    for (let i = 0; i < 4; i++) {
      array.push(datos.results[i].name);
    }
    setPokemon(array);
    /* console.log(pokemon); */

    const promises = datos.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })
    const resultado = await Promise.all(promises)
    setDatosPokemon(resultado)
    console.log(resultado)
  }

  useEffect(() => {
    fetchPokemones();
  }, []);


  function seleccionarPokemones(pokemones) {
    let array = [];
    for (let i = 0; i < 4; i++) {
      let random = Math.random() * 1000;
      let entero = Math.floor(random);
      let num = Math.floor(entero / 10);
      /* console.log(pokemones[num]); */
      array.push(pokemones[num]);
    }
    setarrayCartas(array);
    console.log(arrayCartas);
    /* console.log(arrayCartas[0].name); */
  }

  return (
    <div className="App">
      <button className="button" onClick={() => {
        fetchPokemones();
      }}>Revolver
      </button>

      <Switch />

      <main>
        <div className="cont-imagenes">

          {
            datosPokemon.map((item, index) => (
              <div className={item.id} key={index} id='img'>
                <img src={item.sprites.other.dream_world.front_default} className={item.name} onDragStart={(e) => {
                  e.dataTransfer.setData("clase", e.target.className);
                }} />
              </div>
            ))

          }

        </div>

        <div className="cont-cards">
          {
            pokemon.map((item, index) => (
              <Cards key={index} name={item} />
            ))
          }
        </div>
      </main>



    </div>
  )
}

export default App
