import style from "./style.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export function Home() {
  const [summoner, setSummoner] = useState();
  function onChangeSummoner(ev) {
    setSummoner(ev.target.value.toLowerCase().replace(/ /g, ""));
  }

  return (
    <>
      <img src="/assets/background.png" alt="" className={style.background} />
      <img
        src="https://www.leagueoflegends.com/static/support-d63ae08baf517425864ddc020a5871d5.png"
        alt="Thresh"
        className={style.thresh}
      />
      <img
        src="https://www.leagueoflegends.com/static/assassin-d64d3ffdda15e1eed637aefe6a2c7fee.png"
        alt="Akali"
        className={style.akali}
      />
      <div className={style.container}>
        <h1>
          League <span>Search</span>
        </h1>
        <p>
          Pesquise sobre seu adversário e fique sempre um passo a frente dele!
        </p>
        <div className={style.searchContainer}>
          <label htmlFor="">
            <img src="/assets/search-icon.svg" alt="" />
            <input
              type="text"
              placeholder="Nick do jogador"
              onChange={onChangeSummoner}
            />
          </label>

          <Link to={`summoner/${summoner}`}>
            <button>BUSCAR</button>
          </Link>
        </div>
      </div>
    </>
  );
}
