import { FetchDataOne } from '../Fetch/FetchDataOne';
import { FetchDataTwo } from '../Fetch/FetchDataTwo'
import Buscador from '../Buscador/Buscador';
import BuscadorCombate from '../BuscadorCombate/BuscadorCombate'
import { useState } from 'react'
import './Combate.css'
import Button from '../Elementos/Button/Button'


function Combate () {

    const [pokemonOne, setPokemonOne] = useState('')
    const [loadingOne, setLoadingOne] = useState(false)
    const [hpPokemonOne, setHpPokemonOne] = useState(0)
    const [disableAttackOne, setDisableAttackOne] = useState()
    
    const [pokemonTwo, setPokemonTwo] = useState('')
    const [loadingTwo, setLoadingTwo] = useState(false)
    const [hppokemonTwo, setHpPokemonTwo] = useState(0)
    const [disableAttackTwo, setDisableAttackTwo] = useState()

    const getPokemonOne = async (query) => {
        setLoadingOne(true)
        const res = await FetchDataOne(query)
        const resultOne = await res.json()
        const vidaUno = resultOne.stats.find(stat => stat.stat.name === 'hp')
        setPokemonOne(resultOne)
        setHpPokemonOne(vidaUno?.base_stat * 4)
        setLoadingOne(false)
    }

    const getPokemonTwo = async (query) => {
    setLoadingTwo(true)
        const res = await FetchDataTwo(query)
        const resultTwo = await res.json()
        const vidaDos = resultTwo.stats.find(stat => stat.stat.name === 'hp')
        setPokemonTwo(resultTwo)
        setHpPokemonTwo(vidaDos?.base_stat * 4)
    setLoadingTwo(false)
    }


    const attackPokemonOne = (attackType) => {
        setDisableAttackOne(true)
        setDisableAttackTwo(false)  
        const attackUno = pokemonOne.stats.find(stat => stat.stat.name === attackType)
        setHpPokemonTwo(hppokemonTwo - attackUno.base_stat)
        console.log(attackUno)
    }

    const attackPokemonTwo = (attackType) => {
        setDisableAttackOne(false)
        setDisableAttackTwo(true)   
        const attackDos = pokemonTwo.stats.find(stat => stat.stat.name === attackType)
        setHpPokemonOne(hpPokemonOne - attackDos.base_stat)
        console.log(attackDos)
    }


    return (
        <>
            <div className='ctn-combate'>
                <div className='ctn-seleccionar-peleador'>
                    
                    <div>
                        <h1>Jugador 1</h1>
                    </div>
                    <div>
                        <Buscador getPokemonOne={getPokemonOne} />
                    </div>
                    
                    {!loadingOne && pokemonOne ? (
                        <div className='ctn-stat-peleador'>
                            <h1 className='capitalizate-pokename'>{pokemonOne.name.charAt(0).toUpperCase() + pokemonOne.name.slice(1)}</h1>
                            {hpPokemonOne > 1 ? (<div>
                                <img src={pokemonOne?.sprites.front_default} alt={pokemonOne.name} />
                            </div>) : (<div>
                                <img src={pokemonOne?.sprites.front_default} alt={pokemonOne.name} />
                            </div>)}
                            <div>Vida {hpPokemonOne >= 25 ?
                                (<h1 >{hpPokemonOne}</h1>) : hpPokemonOne <= 24 && hpPokemonOne > 0 ?
                                    (<h1>{hpPokemonOne}</h1>) :
                                    hpPokemonOne <= 0 && (
                                        <>
                                            <div>
                                                <h1>0</h1>
                                            </div>
                                            <div className='ctn-win'>
                                                <p>Ganador Jugador 1</p>
                                            </div>
                                        </>
                                    )}
                            </div>

                            <div className='ctn-button'>
                                <Button 
                                    onClick={() => attackPokemonOne('attack')} 
                                    disabled={disableAttackOne || hpPokemonOne <= 0} 
                                    type="button" 
                                    name= 'PUNCH'
                                    className='button-punch'
                                    /> 
                            </div> 

                        </div>) : null}
                </div>
                

                <div className='ctn-seleccionar-peleador'>
                    <div> 
                        <h1>Jugador 2</h1>
                    </div>
                    <div>
                        <BuscadorCombate getPokemonTwo={getPokemonTwo} />
                    </div>
                    {!loadingTwo && pokemonTwo ? (
                        <div className='ctn-stat-peleador'>
                            <h1 className='capitalizate-pokename'>{pokemonTwo.name.charAt(0).toUpperCase() + pokemonTwo.name.slice(1)}</h1>
                            {hppokemonTwo > 1 ? (<div>
                                <img 
                                    src={pokemonTwo?.sprites.front_default} 
                                    alt={pokemonTwo.name} />
                            </div>) : (<div>
                                <img 
                                    src={pokemonTwo?.sprites.front_default} 
                                    alt={pokemonTwo.name} />
                            </div>)}
                            <div>Vida {hppokemonTwo >= 25 ?
                                (<h1>{hppokemonTwo}</h1>) : hppokemonTwo <= 24 && hppokemonTwo > 0 ?
                                    (<h1>{hppokemonTwo}</h1>) :
                                    hppokemonTwo <= 0 && (
                                        <>
                                            <div>
                                                <h1>0</h1>
                                            </div>
                                            <div className='ctn-win'>
                                                <p>ganador Jugador 2</p>
                                            </div>
                                        </>
                                    )}
                            </div>

                            <div className='ctn-button'>
                                <Button 
                                    onClick={() => attackPokemonTwo('attack')} 
                                    disabled={disableAttackTwo || hppokemonTwo <= 0} 
                                    type="button" 
                                    name= 'PUNCH'
                                    className='button-punch'
                                    />
                                    
                            </div>
                        </div>) : null}
                </div>
            </div >
        </>
    )
}

export default Combate