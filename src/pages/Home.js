import React, { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import {
  searchTournaments,
  TOURNAMENT_PER_PAGE,
} from "../utility/utilityFunctions";

import Banner from "../components/HomePageComponents/Banner";
import TournamentList from "../components/HomePageComponents/TournamentList";
import TabsAndSearchBox from "../components/HomePageComponents/TabsAndSearchBox";
function Home() {
  const url = "https://webwiz-server.onrender.com/";
  // const url = "http://localhost:5000/";

  const { data: tournaments = [], isPending, error } = useFetch(url);
  const [tabActive, setTabActive] = useState("All");
  const [filteredList, setFilteredList] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(1);
  useEffect(() => {
    setFilteredList(tournaments);
  }, [isPending]);
  return (
    <div className="text-center text-white my-10 md:w-3/4 mx-auto">
      <Banner></Banner>
      <div className=" my-10 w-full">
        <TabsAndSearchBox
          tournaments={tournaments}
          tabActive={tabActive}
          setTabActive={setTabActive}
          setFilteredList={setFilteredList}
          setPaginationIndex={setPaginationIndex}
          error={error}
        ></TabsAndSearchBox>

        <TournamentList
          tournamentList={filteredList}
          pending={isPending}
          itemPerPage={TOURNAMENT_PER_PAGE}
          paginationIndex={paginationIndex}
          error={error}
        ></TournamentList>
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
