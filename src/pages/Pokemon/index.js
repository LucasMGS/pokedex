import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import colors from '../../constants/colors';
import './styles.css';

export default function Pokemon() {
	const userName = localStorage.getItem('username');
	const { pokemonName } = useParams();
	const [pokemon, setPokemon] = useState({});
	const [pokemonIsFav, setPokemonIsFav] = useState(false);
	const [pokemonsKind, setPokemonsKind] = useState([]);


	useEffect(() => {
		async function getPokemon(){
			var response = await api
			.get(`pokemons/${pokemonName}`)			
			.catch((error) => {
				alert(`Erro ao recuperar pokemon: ${error}`);
			});

			setPokemon(response.data);
			setPokemonsKind(response.data.kind.split(';'));

		}
		
		async function getFavPokemon(){
			api.get(`users/${userName}`).then((response) => {
				const favPokemons = response.data.pokemons;
				const favPokemon = favPokemons.find((x) => x.name === pokemonName);
				console.log(`favPokemon: ${favPokemon}`);
				if (favPokemon !== undefined) {
					console.log(`Contem: ${favPokemon}`);
					setPokemonIsFav(true);
				}
			});
		}
		getPokemon();
		getFavPokemon();
	}, [pokemonName, userName]);

	async function favoritar() {
		try {
			await api.post(`users/${userName}/starred/${pokemonName}`).then(() => {
				alert('pokemon favoritado com sucesso!');
				setPokemonIsFav(true);
			});
		} catch (error) {
			alert(`Erro ao favoritar pokemon: ${error}`);
		}
	}

	async function desfavoritar() {
		await api.delete(`users/${userName}/starred/${pokemonName}`).then(() => {
			alert('pokemon desfavoritado com sucesso!');
			setPokemonIsFav(false);
		});
	}

	return (
		<>
			<div className="container">
				<div className="info-container" style={{backgroundColor: colors[pokemonsKind[0]]}}>
					<div className="pokemon-info-left">
						<p>Nº {pokemon.number}</p>
						<img style={{ height: '200px', width: '200px' }} src={pokemon['image_url']} alt="pokemon_img" />
					</div>
					<div className="pokemon-info-right">
						<div className="pokemon-name">
							<p>{pokemonName[0].toUpperCase() + pokemonName.slice(1)}</p>
						</div>

						<div className="specific-pokemon-kind-container">			
						{pokemonsKind.map((kind) => (
							<div style={{backgroundColor: colors[kind]}}  key={kind} className="specific-pokemon-kind">
								<p  >{kind}</p>
							</div>
						))}
						</div>

						<div className="pokemon-height">
							<p>Altura: {pokemon['height']}</p>
						</div>
						<div className="pokemon-weigth">
							<p>Peso: {pokemon['weight']}</p>
						</div>

						<div className="fav-button">
							<button className={pokemonIsFav ? 'desfavoritado' : 'favoritado'} onClick={pokemonIsFav ? desfavoritar : favoritar}>
								{pokemonIsFav ? 'Desfavoritar' : 'Favoritar'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
