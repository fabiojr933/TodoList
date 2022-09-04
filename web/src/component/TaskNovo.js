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
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [alarm, setAlarm] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem('token');

    var data = {
      description: description,
      title: title,
      alarm: alarm
    }
    var config = {
      method: 'POST',
      url: api.base_url + '/task',
      headers: {
        'x-access-token': JSON.parse(user)
      },
      data: data
    }

    try {
      const response = await axios(config);
      if (response.status == 201) {
        history.push('/home');
      }
    } catch (error) {
      console.log(error)
    }


  };
  return (
    <main className="form-signin">
      <form onSubmit={onSubmit}>
        <h1 className="form-h1">Nova Tarefa</h1>

        <div className="input-group suFormField">
          <input
            type="text"
            name="title"
            className="input suInput"
            onChange={(e) => { setTitle(e.target.value) }}
            placeholder="Titulo"
            required
          />
        </div>

        <div className="input-group suFormField">
          <input
            type="text"
            name="description"
            onChange={(e) => { setDescription(e.target.value) }}
            className="input suInput"
            placeholder="Descrição"
            required
          />
        </div>

        <div className="input-group suFormField">
          <input
            type="datetime-local"
            name="alarm"
            onChange={(e) => { setAlarm(e.target.value) }}
            className="input suInput"
            placeholder="Data"
            required
          />
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

