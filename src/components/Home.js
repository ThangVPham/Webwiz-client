import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import {
  searchTournaments,
  deleteTournament,
  TOURNAMENT_PER_PAGE,
} from "../utility/utilityFunctions";
import Logo from "../asset/trophy.png";
function Home() {
  const url = "https://webwiz-server.onrender.com/";
  const { data: tournaments, isPending, error } = useFetch(url);
  console.log(tournaments);
  const [tabActive, setTabActive] = useState("All");
  const [filteredList, setFilteredList] = useState(tournaments);
  const [paginationIndex, setPaginationIndex] = useState(1);
  const deleteURL = "https://webwiz-server.onrender.com/delete/";
  useEffect(() => {
    let array = [];

    if (tabActive === "All") {
      setPaginationIndex(1);

      setFilteredList(tournaments);
      return;
    } else if (tabActive === "Pending") {
      tournaments.forEach((tournament) => {
        setPaginationIndex(1);
        if (tournament.status === tabActive) {
          array.push(tournament);
        }
      });
    } else if (tabActive === "In Progress") {
      setPaginationIndex(1);

      tournaments.forEach((tournament) => {
        if (tournament.status === tabActive) {
          array.push(tournament);
        }
      });
    } else if (tabActive === "Complete") {
      setPaginationIndex(1);

      tournaments.forEach((tournament) => {
        if (tournament.status === tabActive) {
          array.push(tournament);
        }
      });
    }

    setFilteredList(array);
  }, [tabActive, isPending]);

  function setTab(tab) {
    setTabActive(tab);
  }

  return (
    <div className="text-center text-white my-10 md:w-3/4 mx-auto">
      <div className="bg-stone-800 banner h-52 md:h-80">
        <div className="filter flex flex-col justify-center items-center">
          <h1 className="mx-10 text-center font-medium text-white text-2xl md:text-5xl 2xl:text-6xl md:p-3 lg:p-5">
            Welcome to WebWiz Tournament
          </h1>
          <div className=" flex w-100 mb-5">
            <img
              className="mr-12 lg:w-36 md:w-28 sm:w-24 w-20"
              src={Logo}
              alt="logo"
            />
          </div>

          <Link
            className="bg-amber-600 rounded py-2 px-10  text-center  mx-auto text-base text-white lg:text-md  h-8"
            to="/new"
          >
            <p className="w-full text-sm lg:text-md">Create A Tournament</p>
          </Link>
        </div>
      </div>
      <div className=" my-10 w-full">
        {/* Tournament Status Filter */}
        <div className="flex justify-center text-slate-400">
          <button
            className={
              tabActive === "All"
                ? " bg-gray-600 py-0.1 rounded px-5  cursor-pointer disabled"
                : "py-0.1 rounded px-5  cursor-pointer"
            }
            onClick={() => {
              if (tournaments !== null) {
                setTab("All");
              }
            }}
          >
            All
          </button>
          <button
            className={
              tabActive === "Pending"
                ? " bg-gray-600 py-0.1 rounded px-5  cursor-pointer"
                : "py-0.1 rounded px-5 cursor-pointer"
            }
            onClick={() => {
              if (tournaments !== null) {
                setTab("Pending");
              }
            }}
          >
            Pending
          </button>
          <button
            className={
              tabActive === "In Progress"
                ? " bg-gray-600 py-0.1 rounded px-5 cursor-pointer"
                : "py-0.1 rounded px-5 cursor-pointer"
            }
            onClick={() => {
              if (tournaments !== null) {
                setTab("In Progress");
              }
            }}
          >
            In Progress
          </button>
          <button
            className={
              tabActive === "Complete"
                ? " bg-gray-600 py-0.1 rounded px-5 cursor-pointer"
                : "py-0.1 rounded px-5 cursor-pointer"
            }
            onClick={() => {
              if (tournaments !== null) {
                setTab("Complete");
              }
            }}
          >
            Complete
          </button>
        </div>

        {/* Search bar based on tournament's name and game title*/}
        <div className="my-3 flex justify-center ">
          <input
            className="rounded h-12  bg-transparent w-11/12  border border-slate-700"
            type="text"
            onChange={(event) => {
              if (!error) {
                // searchTournaments(event.target.value);
                searchTournaments(
                  event.target.value,
                  tournaments,
                  tabActive,
                  setFilteredList
                );
              }
            }}
            placeholder="Search your tournaments"
          />
        </div>

        {/* Spinning icon while loading */}
        {isPending && (
          <div>
            <div className="flex justify-center">
              <img
                className="w-5 py-5"
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                alt=""
              />
            </div>
          </div>
        )}

        {/* Display tournaments */}
        {filteredList &&
          filteredList.map((tournament, index) => {
            if (
              index >= TOURNAMENT_PER_PAGE * (paginationIndex - 1) &&
              index < TOURNAMENT_PER_PAGE * paginationIndex
            ) {
              return (
                <div
                  key={index}
                  className={
                    tournament.champion
                      ? "bg-green-900 my-3 mx-auto w-11/12 z-0"
                      : "bg-slate-600 my-3 mx-auto w-11/12 z-0"
                  }
                >
                  <div className=" flex justify-start py-1 px-1">
                    <div className="w-1/3 sm:w-1/4  lg:w-2/12 xl:w-1/12 p-1 flex">
                      <img
                        src={tournament.imgURL}
                        alt="icon"
                        className="w-100 mx-auto flex "
                      />
                    </div>
                    <div className="w-2/3 sm:w-3/4  lg:w-10/12 xl:w-11/12 p-1 text-start">
                      <Link
                        to={`/tournaments/${tournament._id}`}
                        state={{ data: tournament }}
                        key={tournament.id}
                      >
                        <div>
                          <div className="font-bold uppercase">
                            {tournament.name}
                          </div>
                          <div>{tournament.type + " - " + tournament.game}</div>
                          <div className="text-sm italic">
                            Status: {tournament.status}
                          </div>
                          <div className="text-sm flex justify-between">
                            <div>{tournament.date.slice(0, 10)}</div>
                            <div className="mr-1 flex">
                              <div>
                                {tournament.competitors} &nbsp;{" "}
                                <i className="fas fa-user"></i>
                              </div>
                            </div>
                          </div>
                          {tournament.champion && (
                            <div>Winner: {tournament.champion}</div>
                          )}
                        </div>
                      </Link>

                      <div className="text-end pr-1">
                        <button
                          onClick={() => {
                            deleteTournament(tournament._id, deleteURL);
                          }}
                        >
                          <i className="fas fa-trash-alt ml-3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        {error && <div>Unable to retrieve data.</div>}
      </div>
      <Pagination
        numOfTournament={filteredList ? filteredList.length : 0}
        setPaginationIndex={setPaginationIndex}
        paginationIndex={paginationIndex}
      ></Pagination>
    </div>
  );
}

export default Home;
