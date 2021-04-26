import React, {useState} from 'react';
import "./styles.css";

function Loading() {
     let random = Math.random();
	let numRandom = random > 0.5 ? Math.ceil(random) : Math.floor(random);
	const [randomNumber] = useState(numRandom);

	const loadingImages = {
		0: 'https://cdn.discordapp.com/attachments/610996514084618270/835848350611275786/13944.gif',
		1: 'https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif',
	};

	return (
		<div className="loading-container">
			<img className="loading-image" src={loadingImages[randomNumber]} alt="loading" />
			<div className="loading-text-container">
				<img src="https://www.passecarros.com.br/assets/images/loading.gif" alt="loading" />
				<p>Carregando....</p>
			</div>
		</div>
	);
}

export default Loading;
