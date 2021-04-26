import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import './styles.css';

export default function Pokemon() {
	const userName = localStorage.getItem('username');
	const { pokemonName } = useParams();
	const [pokemon, setPokemon] = useState({});
	const [pokemonIsFav, setPokemonIsFav] = useState(false);

	useEffect(() => {
		api.get(`pokemons/${pokemonName}`).then((response) => setPokemon(response.data));
		api.get(`users/${userName}`).then(response => {
			const favPokemons = response.data.pokemons;
			const favPokemon = favPokemons.find(x => x.name === pokemonName);
			console.log(`favPokemon: ${favPokemon}`);
			if(favPokemon !== undefined){
				console.log(`Contem: ${favPokemon}`);
				setPokemonIsFav(true);
			}
		});
	}, [pokemonName,userName]);

	async function favoritar(){
		await api.post(`users/${userName}/starred/${pokemonName}`).then(() => {
			alert('pokemon favoritado com sucesso!')
			setPokemonIsFav(true);

	});
	}

	async function desfavoritar(){
		await api.delete(`users/${userName}/starred/${pokemonName}`).then(() => {
			alert('pokemon desfavoritado com sucesso!')
			setPokemonIsFav(false);	
		});
	}

	return (
		<>
			<div className="container">
				<div className="info-container">
					<div className="pokemon-info-left">
						<p>Nº {pokemon.number}</p>
						<img style={{ height: '200px', width: '200px' }} src={pokemon['image_url']} alt="pokemon_img" />
					</div>
					<div className="pokemon-info-right">
						<div className="pokemon-name">
							<p>{pokemon.name}</p>
						</div>

						<div className="pokemon-kind">
							<p>{pokemon.kind}</p>
						</div>
						<div className="pokemon-height">
							<p>Altura: {pokemon['height']}</p>
						</div>
						<div className="pokemon-weigth">
							<p>Peso: {pokemon['weight']}</p>
						</div>

						<div className="fav-button">
							<button className={pokemonIsFav ? 'desfavoritado' : 'favoritado'} 
							onClick={pokemonIsFav ? desfavoritar : favoritar}>
								{pokemonIsFav ? 'Desfavoritar' : 'Favoritar'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
