import Card from "../components/Card";
import axios from 'axios';
import { useEffect, useState } from "react";
import gearLoad from "./assets/Gear-0.2s-264px.svg"

export default function HomePage() {
    const [pokemons, setPokemons] = useState([]);
    const [popular, setPopular] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPopular, setLoadingPopular] = useState(false)

    async function fetchPokemons() {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)

            setPokemons(data.results)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    async function fetchPopularPokemon() {
        try {
            setLoadingPopular(true)
            const { data } = await axios.get(`http://localhost:3000/popular-pokemon`)


            setPopular(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingPopular(false)
        }
    }

    useEffect(() => {
        fetchPokemons()
        fetchPopularPokemon()
    }, [])

    return (
        <>
            <div id="PAGE-HOME" className="p-3">
                <div className="text-2xl font-bold px-10 mt-5"> Today's Most Popular Pokemon
                </div>
                <div className="divider px-10"></div>
                {loadingPopular ? (
                    <>
                        <div className="mt-10 flex justify-center items-center">
                            <img src={gearLoad} />
                        </div>
                    </>
                ) : (
                    <>
                        <main className="px-10 my-8 bg-base-100">
                            <div className="card bg-base-100 shadow-2xl flex flex-row">
                                <>
                                    <figure>
                                        <img
                                            className="p-4 w-3/4"
                                            src={popular?.sprites?.other?.["official-artwork"]?.front_default}
                                            alt="pokemon image"
                                        />
                                    </figure>
                                </>
                                <div className="p-10 flex justify-center">
                                    <div className="card-title text-6xl">
                                        ITS
                                        <span className=" text-yellow-500 mx-5">
                                            {popular?.species?.name.toUpperCase()}
                                        </span>
                                        !!!
                                    </div>
                                </div>
                            </div>
                        </main>
                    </>
                )}
                <div className="divider px-10"></div>
                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <main className="grid grid-cols-4 gap-5 px-10 my-8 bg-base-100">
                        {pokemons.map(pokemon => {
                            return <Card pokemon={pokemon} key={pokemon.name} />
                        })}
                    </main>
                )}
            </div >
        </>
    )
}