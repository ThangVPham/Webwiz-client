import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  searchTournaments,
  deleteTournament,
  TOURNAMENT_PER_PAGE,
} from "../../utility/utilityFunctions";
function TournamentList({
  tournamentList = [],
  pending = true,
  itemPerPage,
  paginationIndex,
  error = false,
}) {
  const deleteURL = "https://webwiz-server.onrender.com/delete/";
  return (
    <div>
      {/* Spinning icon while loading */}
      {pending && (
        <div className="flex justify-center">
          <img
            className="w-5 py-5"
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt=""
          />
        </div>
      )}
      {/* Display tournaments */}
      {tournamentList &&
        tournamentList.map((tournament, index) => {
          if (
            index >= itemPerPage * (paginationIndex - 1) &&
            index < itemPerPage * paginationIndex
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
  );
}

export default TournamentList;
