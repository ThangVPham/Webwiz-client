const TOURNAMENT_PER_PAGE = 5;

function searchTournaments(str, tournaments, tabActive, setFilteredList) {
  let filter = tournaments.filter((tourney) => {
    if (tabActive === "All") {
      if (
        tourney.name.toLowerCase().includes(str) ||
        tourney.game.toLowerCase().includes(str)
      ) {
        return tourney;
      }
    } else if (
      (tourney.name.toLowerCase().includes(str) ||
        tourney.game.toLowerCase().includes(str)) &&
      tourney.status === tabActive
    ) {
      return tourney;
    }
  });

  setFilteredList(filter);
}

function deleteTournament(id, deleteURL) {
  fetch(deleteURL + id, {
    method: "DELETE",
  }).then(() => {
    window.location.href = "/";
  });
}

function setPaginationIndexNav(paginationIndex, setPaginationIndex) {
  setPaginationIndex(paginationIndex);
}

function increasePaginationIndex(paginationIndex, setPaginationIndex, end) {
  console.log(paginationIndex);

  if (paginationIndex < end) {
    setPaginationIndex(Number(paginationIndex) + 1);
  }
}
function decreasePaginationIndex(paginationIndex, setPaginationIndex) {
  console.log(paginationIndex);

  if (paginationIndex > 1) {
    setPaginationIndex(Number(paginationIndex) - 1);
  }
}

export {
  searchTournaments,
  deleteTournament,
  TOURNAMENT_PER_PAGE,
  setPaginationIndexNav,
  decreasePaginationIndex,
  increasePaginationIndex,
};
