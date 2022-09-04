import React, { Component, useState } from "react";
import { Redirect, Link } from "react-router";
import axios from "axios";
import "./css/Login.css";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "" });

  const { email } = form;
  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((form) => ({ ...form, [e.target.name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("account/login", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="pr-h1">Password Reset</h1>
        <p className="pr-p">
          Please enter your email address below to reset your Mobiele account
          password.
        </p>

        <div className="input-group suFormField">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="input loginInput"
            placeholder="Email Address"
          />
        </div>

        <button className="btn btnDefault btn-purp loginBtn" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
