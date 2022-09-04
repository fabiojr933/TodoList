import React, { useEffect, useState } from "react";
import api from "../services";
import "./css/home.css";
import agenda from "./img/agenda2.png";
import axios from 'axios';
import moment from 'moment'
import useSWR from 'swr'

// list of items
const list = [
  { name: <img className="bgIMG" src={agenda} alt="" /> },
];


export default function Finished() {

  const [dados, setDados] = useState([]);  

  const token = localStorage.getItem("token");

  const fetcher3 = (url) =>
    axios
      .get(url, { headers: { 'x-access-token': JSON.parse(token) } })
      .then((res) => {
        setDados(res.data)
        console.log(res)
      });
  const { data, error } = useSWR(
    api.base_url + '/Task/finished',
    fetcher3, {
    refreshInterval: 5000
  }
  );  
 
  return (
    <div id="home"><br />
      <section id="browseGames">
        <h3>Listas de Tarefas Concluida</h3>
        <hr className="bgHr" />

        <div className="games-scroll">

          {
            dados.map((v, i) => (
              <>
              <div className="eachBG">
                <img className="bgIMG" src={agenda} alt="" />
                <p>{v.title} || {moment(v.alarm).format('DD-MM-YYYY HH:mm:ss')}</p>
              </div> 
              </>
            ))}

        </div>
      </section>
    </div>
  );
}
