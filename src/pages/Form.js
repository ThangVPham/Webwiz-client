import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../asset/notfound.png";

// import useFetch from "./useFetch";

function Form({ navigation }) {
  const [gameArray, setGameArray] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [newTournament, setNewTournament] = useState({
    name: "",
    description: "",
    game: "",
    gameID: "",
    imgURL: "",
    type: "Single Elimination",
    competitors: 8,
    date: "",
    status: "Pending",
    firstRound: {
      status: false,
      matches: [
        {
          matchName: "",
          players: [],
          winner: "",
          loser: "",
        },
      ],
    },
    secondRound: {
      status: false,
      matches: [
        {
          matchId: 5,
          matchName: "Match E",
          players: [],
          winner: "",
          loser: "",
        },
        {
          matchId: 6,
          matchName: "Match F",
          players: [],
          winner: "",
          loser: "",
          status: false,
        },
      ],
    },
    thirdRound: {
      matchId: 7,
      matchName: "Match G",
      players: [],
      winner: "",
      loser: "",
      status: false,
    },
    final: {
      matchId: 8,
      matchName: "Match H",
      players: [],
      winner: "",
      loser: "",
      status: false,
    },
    champion: "",
    runnUp: "",
    thirdPlace: "",
  });
  console.log(formValid);
  const navigate = useNavigate();
  const url = "https://webwiz-server.onrender.com";
  // const url = "http://localhost:5000";
  useEffect(() => {}, [gameArray]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newTournament.name &&
      newTournament.game &&
      newTournament.date &&
      newTournament.imgURL &&
      newTournament.gameID
    ) {
      fetch(`${url}/new-tournaments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTournament),
      })
        .then(() => {
          console.log(newTournament);
          navigate("/");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      setFormValid(false);
    }
  };

  async function searchGame(e) {
    try {
      if (e.key === "Enter" || e.type === "click") {
        setGameArray([]);
        setLoading(true);
        await fetch(`${url}/games`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newTournament.game }),
        })
          .then((data) => data.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setGameArray(data);
              setLoading(false);
            } else {
              setGameArray([data]);
              setLoading(false);
            }
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className=" mx-5 mt-5 text-white md:w-2/3 lg:w-1/3 md:mx-auto">
      <div className=" w-full ">
        <div className="my-3 ">
          <div className="font-bold bg-slate-800 ">
            <h3 className="py-2 px-5">Basic Info</h3>
          </div>

          <div className="bg-gray-700 ">
            {!formValid && (
              <div className="pt-2 pb-1 px-5 text-rose-600">
                <p>
                  <i>Highlighted fields are required.*</i>
                </p>
              </div>
            )}
            <div className="pt-2 pb-1 px-5">
              <label>Tournament name:</label>
            </div>
            <div className="pb-2 px-5">
              <input
                className={
                  !formValid
                    ? newTournament.name
                      ? " bg-slate-800 w-full"
                      : "bg-slate-800 w-full border-2 border-rose-500"
                    : " bg-slate-800 w-full"
                }
                type="text"
                value={newTournament.name}
                onChange={(e) =>
                  setNewTournament((oldState) => {
                    return { ...oldState, name: e.target.value };
                  })
                }
              />
            </div>
            <div className="pt-2 pb-1 px-5">
              <label>Description:</label>
            </div>
            <div className="pb-2 px-5">
              <textarea
                className=" bg-slate-800 w-full"
                type="text"
                value={newTournament.description}
                onChange={(e) =>
                  setNewTournament((oldState) => {
                    return { ...oldState, description: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-800 rounded">
          <div className="font-bold bg-slate-800">
            <h3 className="py-2 px-5">Game Info</h3>
          </div>
          <div className="bg-gray-700 ">
            <div className="pt-2 pb-1 px-5">
              <label>Search Game:</label>
            </div>
            <div className="pb-2 px-5 flex ">
              <input
                className={
                  !formValid
                    ? newTournament.game
                      ? " bg-slate-800 w-full"
                      : " bg-slate-800 w-full border-2 border-rose-500"
                    : " bg-slate-800 w-full"
                }
                type="text"
                value={newTournament.game}
                onChange={(e) => {
                  setNewTournament((oldState) => {
                    return { ...oldState, game: e.target.value };
                  });
                }}
                onKeyDown={(e) => searchGame(e)}
                placeholder="Game Title"
              />
              <button>
                <i
                  className="fas fa-search pt-1 pl-1 search"
                  onClick={(e) => searchGame(e)}
                ></i>
              </button>
            </div>
            {loading && (
              <div className="flex justify-center">
                <img
                  className="w-5 py-5"
                  src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  alt=""
                />
              </div>
            )}
            {((!loading && gameArray.length === 0) ||
              (gameArray.length === 1 && gameArray[0].id === "Not Found")) && (
              <div className="pb-2 px-5 flex flex-wrap w-full justify-center text-stone-300">
                <p>
                  <i>-- No Titles Found --</i>
                </p>
              </div>
            )}
            {gameArray.length > 0 && gameArray[0].name !== "Not Found" && (
              <div className="pb-2 px-5 flex flex-wrap w-full justify-start">
                {gameArray.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        item.id === newTournament.gameID
                          ? "p-1 basis-24 gameItems gameItems-active"
                          : "p-1 basis-24 gameItems"
                      }
                      onClick={(e) => {
                        setNewTournament((oldState) => {
                          return {
                            ...oldState,
                            name: item.name,
                            gameID: item.id,
                            imgURL: item.coverURL,
                          };
                        });
                      }}
                    >
                      <img
                        src={
                          item.coverURL === "Cover Not Found"
                            ? img
                            : item.coverURL
                        }
                        alt={item.name}
                      />
                      <p className="text-sm text-center w-20">{item.name}</p>
                    </div>
                  );
                })}
                <div></div>
              </div>
            )}

            <div className="pt-2 pb-1 px-5">
              <label>Format:</label>
            </div>
            <div className="pb-2 px-5">
              <select
                className=" bg-slate-800 w-full"
                name="game-type"
                id="game-type"
                value={newTournament.type}
                onChange={(e) => {
                  setNewTournament((oldState) => {
                    return { ...oldState, type: e.target.value };
                  });
                }}
              >
                <option value="Single Elimination">Single Elimination</option>
                <option value="Leaderboard">Leaderboard</option>
                <option value="Free for All">Free for All</option>
              </select>
            </div>
            <div className="pt-2 pb-1 px-5">
              <label>Number of Competitors:</label>
            </div>
            <div className="pb-2 px-5">
              <input
                type="radio"
                id="4 players"
                name="player"
                disabled
                value={newTournament.competitors}
                onSelect={() => {
                  setNewTournament((oldState) => {
                    return { ...oldState, competitors: 4 };
                  });
                }}
              />
              <label htmlFor="4 players"> 4 players &nbsp;&nbsp;</label>
              <input
                type="radio"
                id="8 players"
                name="player"
                value={newTournament.competitors}
                onSelect={() => {
                  setNewTournament((oldState) => {
                    return { ...oldState, competitors: 8 };
                  });
                }}
                defaultChecked
              />
              <label htmlFor="8 players"> 8 players</label>
            </div>
            <div className="pt-2 pb-1 px-5">
              <label htmlFor="">Start Time:</label>
            </div>
            <div className="pt-1 pb-3 px-5 ">
              <input
                className={
                  !formValid
                    ? newTournament.date
                      ? " bg-slate-800 w-full"
                      : " bg-slate-800 w-full border-2 border-rose-500"
                    : " bg-slate-800 w-full"
                }
                type="date"
                value={newTournament.date}
                onChange={(e) => {
                  setNewTournament((oldState) => {
                    return { ...oldState, date: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-amber-600 rounded my-6 w-1/2 text-center mx-auto text-white">
          <button onClick={(e) => handleSubmit(e)}>Save and Continue</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Form;
