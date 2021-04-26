import React from 'react';
import "./styles.css";
import {Link} from 'react-router-dom';

function navBar() {
  return (
     <header>
     <div className="nav-bar">
          <nav><Link to="/pokedex" style={{textDecoration: "none", color: "black"}}>Pokedex</Link></nav>
          <div className="nav-buttons">
               <Link to="/pokedex" style={{textDecoration: "none", color: "black"}}>Pokedex</Link>
               <Link to="/perfil" style={{textDecoration: "none", color: "black"}}>Perfil</Link>
               <Link to="/" onClick={localStorage.removeItem('username')} style={{textDecoration: "none", color: "black"}}>Sair</Link>
          </div>
     </div>
</header>

  );
}
export default navBar;