import { useEffect, useState } from 'react';
import './App.css'
import Cards from './assets/components/Cards'
import Switch from './assets/components/Switch'
import Loader from './assets/components/Loader'

function App() {

  const [datosPokemon, setDatosPokemon] = useState([]);

  const [pokemon, setPokemon] = useState([]);


  function limpiarCartas() {
    const cartas = document.querySelectorAll(".card");
    cartas.forEach(elem => { elem.classList.remove("error"); elem.classList.remove("correcto"); })
  }


  const fetchPokemones = async (limite = 4) => {
    const random = Math.random() * 200;
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
    setPokemon(array.sort());

    const promises = datos.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })
    const resultado = await Promise.all(promises)
    let lista = [];
    resultado.map((item) => {
      lista.push(item.sprites.other.dream_world.front_default);
    })
    setDatosPokemon(resultado)
    /* console.log(lista) */
  }

  useEffect(() => {
    fetchPokemones();
  }, []);


  /* function seleccionarPokemones(pokemones) {
    let array = [];
    for (let i = 0; i < 4; i++) {
      let random = Math.random() * 100;
      let entero = Math.floor(random);
      let num = Math.floor(entero / 10);
      console.log(pokemones[num]);
      array.push(pokemones[num]);
    }
    setarrayCartas(array);
    console.log(arrayCartas);
    console.log(arrayCartas[0].name);
  } */

  return (
    <div className="App">
      <Loader />
      <div className="contenedor" style={{display:"none"}}>
        <button className="button" onClick={() => {
          limpiarCartas();
          fetchPokemones();
        }}>Revolver
        </button>

        <main className='cont-main'>
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

        <Switch />
      </div>

    </div>
  )
}

export default App
