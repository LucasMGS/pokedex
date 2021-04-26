import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import Perfil from './pages/Perfil';

export default function Routes() {
     return(
     <BrowserRouter>
     <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="*"  component={Pokedex}/> */}
          <Route path="/pokedex" component={Pokedex}/>
          <Route path="/pokemon/:pokemonName"  component={Pokemon}/>
          <Route path='/perfil' component={Perfil}/>
     </Switch>
     </BrowserRouter>
     );
}