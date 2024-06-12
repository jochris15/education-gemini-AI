import { useEffect, useState } from "react";
import axios from 'axios'

export default function Card({ pokemon }) {
    const [pokemonDetail, setPokemonDetail] = useState({})
    const [loading, setLoading] = useState(false)

    async function fetchPokemon() {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            console.log(data);
            setPokemonDetail(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <>
            <div className="card bg-base-100 shadow-2xl flex justify-center">
                {loading ? (
                    <>
                        <h1>Loading</h1>
                    </>
                ) : (
                    <>
                        <figure>
                            <img
                                className="p-4 w-full"
                                src={pokemonDetail?.sprites?.other?.["official-artwork"]?.front_default}
                                alt="pokemon image"
                            />
                        </figure>
                    </>
                )}
                <div className="p-10 flex justify-center">
                    <b className="card-title">{pokemon?.name.toUpperCase()}</b>
                </div>
            </div>
        </>)
}