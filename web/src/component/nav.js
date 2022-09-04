import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, NavLink, useHistory } from "react-router-dom";

import "./css/nav.css";

export default function Nav(props) {

  const token = localStorage.getItem('token');
  const history = useHistory();

 async function logoff(){
  localStorage.removeItem('token');
  history.push('/login');
 }

  const handleLogout = () => {
    localStorage.clear();

    props.setUser(null);
  };
  let buttons;

  if (token == null) {
    return (
      <>
        <nav className="deskNav">
          <ul className="nav-list">
            <li>
              <NavLink exact activeClassName="active-nav" to="/Login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active-nav" to="/SignUp">
                Cadastre-se
              </NavLink>
            </li>           
          </ul>
        </nav>
      </>
    );
  }
  else {
    return (
      <>
        <nav className="deskNav">
          <ul className="nav-list">
            <li>
              <NavLink exact activeClassName="active-nav" to="/Home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active-nav" to="/Task/novo">
                Novo
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active-nav" to="/Task/finished">
                Concluido
              </NavLink>
            </li>            
            <li>
              <Link exact activeClassName="active-nav" onClick={logoff}>
                Sair
              </Link>
            </li>
            <li className="moreDropD">
              <p>...</p>
            </li>
          </ul>
          <div className="nav-btn-div">{buttons}</div>
        </nav>
      </>
    );
  }
}
