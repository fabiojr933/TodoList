import React, { useState, useEffect } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import "./css/Login.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import api from '../services/index';

export default function Login() {
  const history = useHistory();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoad, setBtnLoad] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const togglePasswordVisiblity = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(false);

    axios
      .post(api.base_url + "/login", { 'email': email, 'password': password })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoginErr(true);
        setBtnLoad(true);
      });
  };
  return (
    <>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="form-h1">Login</h1>

          <div className="input-group suFormField">
            <input
              type="email"
              name="email"
              onChange={(e) => { setEmail(e.target.value) }}
              className="input loginInput"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="input-group suFormField">
            <input
              type="password"
              name="password"
              onChange={(e) => { setPassword(e.target.value) }}
              className="input loginInput"
              placeholder="Password"
              required
            />

            {isPasswordShown ? (
              <span
                onClick={togglePasswordVisiblity}
                className="material-icons-outlined loginPassword-icon"
              >
                visibility
              </span>
            ) : (
              <span
                onClick={togglePasswordVisiblity}
                className="material-icons-outlined loginPassword-icon"
              >
                visibility_off
              </span>
            )}
          </div>
          {loginErr ? (
            <p className="pErr text-danger">Invalido Email ou Senha!</p>
          ) : null}

          {btnLoad ? (
            <button
              className="btn btnDefault btn-purp loginBtn"
              type="submit"
            >
              Login
            </button>
          ) : (
            <button className="btn btnDefault btn-purp loginBtn">
              <ScaleLoader color="#fff" height={18} />
            </button>
          )}
        </form><br />
        <p>
          Não possue conta ainda?{" "}
          <Link className="regHere" to="/SignUp">
            CADASTRE AGORA
          </Link>
        </p>
      </main>
    </>
  );
}

