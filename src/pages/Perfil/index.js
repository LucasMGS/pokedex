import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBar';
import PokemonCard from '../../components/pokemonCard/pokemonCard';
import api from '../../services/api';
import './styles.css';
import Loading from '../../components/Loading/Loading';

function Perfil() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const userName = localStorage.getItem('username');
	console.log(userName);
	useEffect(() => {
		try{
		api.get(`users/${userName}`).then((response) => {
			setPokemons(response.data.pokemons);
			setIsLoading(false);
		});
		return () => false;
	} catch(error){
		console.log(error);
	}finally{
		setIsLoading(false);
	}
	}, [userName]);


	return (
		<>
			<NavBar />
			<h1 className="pokemons-title">Meus pokémons favoritos</h1>
			<div className="grid-container">
				
				{isLoading ? <Loading /> : !pokemons ? <div>Você ainda não tem pokémons favoritos!</div> : pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} isLoading={isLoading} />
				))}
			</div>
		</>
	);
}

export default Perfil;
