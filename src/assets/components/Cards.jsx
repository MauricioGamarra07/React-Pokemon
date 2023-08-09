import React from 'react'

function Cards({name}) {

    function validarCarta(carta, destino, contenedor){
        console.log("Carta: " + carta);
        console.log("Destino: " + destino);
        if (carta==destino && contenedor.classList.contains("error")==false){
            contenedor.classList.add("correcto")
        }else if(carta!=destino && contenedor.classList.contains("correcto")==false){
            contenedor.classList.add("error")
        }
    }


    return (
        <>
            <div className="card" onDragOver={(e)=>{
                e.preventDefault();
                /* console.log(2); */
            }} onDrop={(e)=>{
                let nameCarta = e.dataTransfer.getData("clase");
                /* console.log(nameCarta); */
                let nameDestino = e.target.firstElementChild.innerHTML;
                /* console.log(nameDestino); */
                let contCarta = e.target;
                /* console.log(typeof contCarta); */
                validarCarta(nameCarta, nameDestino, contCarta);
            }}>
                <h3>{name}</h3>
            </div>
        </>
    )
}

export default Cards