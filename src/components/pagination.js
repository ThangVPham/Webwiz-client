import React, { useState } from "react";
import {
  TOURNAMENT_PER_PAGE,
  setPaginationIndexNav,
  increasePaginationIndex,
  decreasePaginationIndex,
} from "../utility/utilityFunctions";
function Pagination(props) {
  const tournamentSize = props.numOfTournament;
  const paginationIndex = props.paginationIndex;
  const setPaginationIndex = props.setPaginationIndex;

  const pages = [];
  for (let i = 1; i <= Math.ceil(tournamentSize / TOURNAMENT_PER_PAGE); i++) {
    pages.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <div className="inline-flex -space-x-px">
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => {
              decreasePaginationIndex(paginationIndex, setPaginationIndex);
            }}
          >
            Previous
          </button>

          {pages.map((page, index) => {
            return (
              <button
                key={index}
                className={
                  Number(paginationIndex) === index + 1
                    ? "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={(e) => {
                  setPaginationIndexNav(e.target.value, setPaginationIndex);
                }}
                value={index + 1}
              >
                {index + 1}
              </button>
            );
          })}

          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => {
              increasePaginationIndex(
                paginationIndex,
                setPaginationIndex,
                pages.length
              );
            }}
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Pagination;
