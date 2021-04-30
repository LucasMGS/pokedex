import React, { useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './styles.css';

function Home() {
	const [username, setUsername] = useState('');
	const history = useHistory();

	function registrarUsuario(e) {
		e.preventDefault();
		try {
			api
				.get(`users/${username}`)
				.then((response) => {
					console.log(response.status);
					if (response.status === 200) {
						console.log('Nome de treinador ja existente, entrando...');
					}
				})
				.catch(async (error) => {
					console.log(error);
					console.log('Nome de treinador não existente, criando um com este nome!');
					await api.post('users', { username });
				})
				.finally(() => {
					localStorage.setItem('username', JSON.stringify(username));
					 history.push('/pokedex');
				});
		} catch (error) {
			alert('Não foi possivel conectar com o servidor, tente novamente!');
		}
	}

	return (
		<div className="container">
			<label className="welcome-text">Olá! Digite seu nome de treinador pokémon</label>
			<form onSubmit={registrarUsuario}>
				<div className="input-container">
					<input onChange={(e) => setUsername(e.target.value)} placeholder="Seu nome de treinador" />

					<button className="button">Ver pokedex</button>
				</div>
			</form>
		</div>
	);
}

export default Home;
