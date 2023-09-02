import React from "react";
import { searchTournaments } from "../../utility/utilityFunctions";
function TabsAndSearchBox({
  tabActive,
  setTabActive,
  setFilteredList,
  setPaginationIndex,
  tournaments,
  error,
}) {
  return (
    <div>
      <div className="flex justify-center text-slate-400">
        <button
          value="All"
          className={
            tabActive === "All"
              ? " bg-gray-600 py-0.1 rounded px-5  cursor-pointer disabled"
              : "py-0.1 rounded px-5  cursor-pointer"
          }
          onClick={(e) => {
            if (tournaments !== null) {
              setTabActive(e.target.value);
              setFilteredList(tournaments);
              setPaginationIndex(1);
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
              setTabActive("Pending");
              setFilteredList(() => {
                return tournaments.filter((item) => {
                  return item.status === "Pending";
                });
              });
              setPaginationIndex(1);
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
              setTabActive("In Progress");
              setFilteredList((prevList) => {
                return tournaments.filter((item) => {
                  return item.status === "In Progress";
                });
              });
              setPaginationIndex(1);
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
              setTabActive("Complete");
              setFilteredList((prevList) => {
                return tournaments.filter((item) => {
                  return item.status === "Complete";
                });
              });
              setPaginationIndex(1);
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
    </div>
  );
}

export default TabsAndSearchBox;
