import React, {Fragment} from 'react';
import colors from '../../constants/colors';
import { NavLink } from 'react-router-dom';
import './styles.css';

function pokemonCard({ pokemon }) {

	
	return (
		<Fragment>
				<div style={{ backgroundColor: colors[pokemon.kind.split(';')[0]] }} className="pokemons-container">
					<NavLink to={`pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: 'black' }} exact replace={false}>
						<img src={pokemon.image_url} alt="pokemon-img" />
						<p>
							<strong style={{ textDecoration: 'none' }}>{pokemon.name}</strong>
						</p>
						<div className="pokemon-kinds">
							{pokemon.kind.split(';').map((kind) => (
								<div key={kind} className="kind" style={{ backgroundColor: colors[kind] }}>
									<p>{kind}</p>
								</div>
							))}
						</div>
					</NavLink>
				</div>
			
		</Fragment>
	);
}


export default pokemonCard;
