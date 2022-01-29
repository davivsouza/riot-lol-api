import style from "./summoner.module.scss";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useLayoutEffect, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export function Summoner() {
  const { id } = useParams();
  const [summoner, setSummoner] = useState(Object);
  const [summonerSearch, setSummonerSearch] = useState();
  const [loading, setLoading] = useState(0);
  // const [championName, setChampionName] = useState(["Yasuo"]);
  // const [topChampions, setTopChampions] = useState();
  // async function getChampName(id) {
  //   await axios
  //     .get(
  //       "http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
  //     )
  //     .then((res) => {
  //       let championsData = res.data;
  //       let championList = [];
  //       championList.push(championsData.data);
  //       let champions = Object.values(championList[0]);

  //       for (let i in champions) {
  //         if (champions[i].key === id) {
  //           setChampionName(championName.push(champions[i].id));
  //         }
  //       }
  //     });

  //   console.log(championName);
  // }

  function onChangeSummoner(ev) {
    setSummonerSearch(ev.target.value);
  }

  useLayoutEffect(() => {
    async function api() {
      setLoading(1);
      await axios
        .get(`http://localhost:3030/summoner/${id}`)
        .then((res) => {
          setSummoner(res.data);
        })
        .catch((e) => alert("Jogador não encontrado"));
      setLoading(0);
    }

    api();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className={style.spinner}>
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.navSearch}>
            <Link to="/">
              <h1>
                League <span>Search</span>
              </h1>
            </Link>
            <div className={style.searchContainer}>
              <label htmlFor="">
                <img src="/assets/search-icon.svg" alt="" />
                <input
                  type="text"
                  placeholder="Nick do jogador"
                  onChange={onChangeSummoner}
                />
              </label>

              <button
                onClick={() => {
                  window.location = `/summoner/${summonerSearch
                    .toLowerCase()
                    .replace(/ /g, "")}`;
                }}
              >
                BUSCAR
              </button>
            </div>
          </div>
          {summoner !== {} && (
            <div className={style.summonerData}>
              <div className={style.profile}>
                <div className={style.summonerInfo}>
                  <div>
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${summoner.profileIconId}.png`}
                      alt=""
                    />
                    <div className={style.levelContainer}>
                      <p>{summoner.summonerLevel}</p>
                    </div>
                  </div>

                  <div>
                    <strong>{summoner.summonerName}</strong>
                    <div className={style.winRate}>
                      <p>
                        {summoner.wins
                          ? (
                              (summoner.wins /
                                (summoner.wins + summoner.losses)) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </p>
                      <p>Win Rate</p>
                    </div>
                  </div>
                </div>
                {/* {summoner.championsMasteryData.forEach((element) => {
                  getChampName(element.championId.toString());
                  if (championName.length === 3) {
                    championName.map((element, idx) => (
                      <div key={idx}>
                        <img
                          src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${element}.png`}
                          alt=""
                        />
                      </div>
                    ));
                  }
                })} */}
              </div>
              <div className={style.rankedData}>
                <div className={style.soloDuo}>
                  <>
                    <strong>Ranqueada Solo/Duo</strong>
                    <div>
                      <img
                        onClick={() => {
                          console.log(championName);
                        }}
                        src={
                          summoner.rank
                            ? `/assets/Emblem_${summoner.tier}.png`
                            : "/assets/unranked.png"
                        }
                        alt={summoner.tier}
                      />
                      <div>
                        <strong>
                          {summoner.rank ? (
                            <>
                              {summoner.tier} {summoner.rank}
                            </>
                          ) : (
                            "Unranked"
                          )}
                        </strong>
                        <p>
                          {summoner.wins ? summoner.wins : 0}V{" "}
                          {summoner.losses ? summoner.losses : 0}L
                        </p>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
