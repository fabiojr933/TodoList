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


export default function Home() {

  const [dados, setDados] = useState([]);


  const fetcher = (url) => fetch(url).then((res) => {
    console.log(res)
  });
  useSWR(api.base_url + '/task/alert', fetcher, {
    refreshInterval: 5000
  });




  const token = localStorage.getItem("token");

  //const fetcher = async (url) => fetch(url).then((res) => { console.log(res) });


  const fetcher2 = (url) =>
    axios
      .get(url, { headers: { 'x-access-token': JSON.parse(token) } })
      .then((res) => {
        setDados(res.data)
        console.log(res)
      });
  const { data, error } = useSWR(
    api.base_url + '/task',
    fetcher2, {
    refreshInterval: 5000
  }
  );
  if (error) console.log(error);
  if (data) console.log(data);

  /*
    const Load = async () => {
      const token = localStorage.getItem("token");
      var config = {
        method: 'GET',
        url: api.base_url + '/task',
        headers: {
          'x-access-token': JSON.parse(token)
        }
      }
      console.log(config)
      try {
        const response = await axios(config);
        if (response.status == 200) {
          setDados(response.data);
        }
      } catch (error) {
      }
    }
  
  
    useEffect(() => {
      Load();
    }, []);
  
  
  */
  return (
    <div id="home"><br />
      <section id="browseGames">
        <h3>Listas de Tarefas Pendentes</h3>
        <hr className="bgHr" />

        <div className="games-scroll">

          {
            dados.map((v, i) => (
              <div className="eachBG">
                <img className="bgIMG" src={agenda} alt="" />
                <p>{v.title} || {moment(v.alarm).format('DD-MM-YYYY HH:mm:ss')}</p>
              </div>
            ))}

        </div>
      </section>
    </div>
  );
}
