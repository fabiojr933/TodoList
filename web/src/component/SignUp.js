import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Router,
  useHistory,
  Link,
} from "react-router-dom";
import "react-phone-number-input/style.css";
import axios from "axios";
import "./css/signUp.css";
import api from '../services/index';





export default function SignUp() {

  const history = useHistory();

  const [sPass, setSPass] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const togglePwordV = () => {
    setSPass(!sPass);
  };



  const onSubmit = (e) => {

    e.preventDefault();
    var data = {
      password: password,
      phone: phone,
      name: name,
      email: email
    }

    axios
      .post(api.base_url + '/user', data)
      .then((res) => {
        if (res.status == 201) {
          history.push('/Login');
        } else {
          alert('Ops!! aconteceu algum erro');
        }
      });
  };
  return (
    <main className="form-signin">
      <form onSubmit={onSubmit}>
        <h1 className="form-h1">Preencha os dados</h1>

        <div className="input-group suFormField">
          <input
            type="email"
            name="email"
            className="input suInput"
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-group suFormField">
          <input
            type="text"
            name="name"
            onChange={(e) => { setName(e.target.value) }}
            className="input suInput"
            placeholder="Nome"
            required
          />
        </div>
        <div className="row">
          <div className="no-pad col-lg-6">
            <div className="input-group suFormField pword">
              <input
                type="password"
                name="password"
                onChange={(e) => { setPassword(e.target.value) }}
                className="input suInput cPwordO"
                placeholder="Password"
                required
              />
              {sPass ? (
                <span
                  onClick={togglePwordV}
                  className="material-icons-outlined password-icon"
                >
                  visibility
                </span>
              ) : (
                <span
                  onClick={togglePwordV}
                  className="material-icons-outlined password-icon"
                >
                  visibility_off
                </span>
              )}
            </div>
          </div>
          <div className="no-pad col-lg-6">
            <div className="input-group suFormField cPword">
              <input
                type="text"
                name="phone"
                onChange={(e) => { setPhone(e.target.value) }}
                className="input suInput cPwordO"
                placeholder="Telefone"
                required
              />
            </div>
          </div>

        </div>


        <button
          id="submit_button"
          className={"btn btnDefault signUpBtn"}
          type="submit"
        >Cadastrar
        </button>
      </form>
    </main>
  );
}

