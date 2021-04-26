import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';
import PokemonCard from '../../components/pokemonCard/pokemonCard';
import NavBar from '../../components/navBar/navBar';
import Loading from '../../components/Loading/Loading';

export default function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			async function getPokemons() {
				var response = await api.get('pokemons');
				setPokemons(response.data.data);
				setIsLoading(false);
			}
			getPokemons();
		} catch (error) {
			alert(`Erro ao recuperar os pokemons: ${error}`);
		} finally{
			setIsLoading(false);
		}
	}, []);

	return (
		<>
			<NavBar />
			<h1 className="pokemons-title">Pokémons</h1>
				<div className="grid-container">
					{isLoading ? <Loading /> : pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</div>
			
		</>
	);
}
// {pokemon.kind.split(';')[0]}
