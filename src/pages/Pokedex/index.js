import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';
import PokemonCard from '../../components/pokemonCard/pokemonCard';
import NavBar from '../../components/navBar/navBar';
import Loading from '../../components/Loading/Loading';
import Pagination from 'react-js-pagination';

export default function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);

	function handlePageChange(value) {
		console.log(`pagina ativa: ${value}`);
		setPage(value);
	}

	useEffect(() => {
		try {
			async function getPokemons() {
				var response = await api.get(`pokemons?page=${page}`);
				setPokemons(response.data.data);
				setIsLoading(false);
			}
			getPokemons();
		} catch (error) {
			alert(`Erro ao recuperar os pokemons: ${error}`);
		} finally {
			setIsLoading(false);
		}
	}, [page]);

	return (
		<>
			<NavBar />
			<h1 className="pokemons-title">Pokémons</h1>
			<div className="grid-container">
				{isLoading ? <Loading /> : pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
			</div>
			<div className="pagination">
				<Pagination
					className="pagination-item"
					activePage={page}
					activeClass='active-item'
					onChange={handlePageChange}
					totalItemsCount={325}
					itemClass="page-item"
					linkClass="page-link"
					lastPageText="Última"
					firstPageText="Primeira"
					activeLinkClass='item-link'
					pageRangeDisplayed={7}

				
				/>
			</div>
		</>
	);
}
// {pokemon.kind.split(';')[0]}
