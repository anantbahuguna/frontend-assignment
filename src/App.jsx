import { useMemo, useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import ProjectsTable from "./components/ProjectsTable/ProjectsTable";
import useFetchData from "./hooks/useFetchData";
import "./App.css";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const ITEMS_PER_PAGE = 5;

export default function App() {
  const { data, isLoading, error } = useFetchData(API_URL);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const currentData = useMemo(
    () =>
      data?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [data, itemsPerPage, currentPage]
  );

  if (error) {
    return <h1>Something went wrong! Please try again.</h1>;
  }

  if (isLoading) {
    return <h1>LOADING....</h1>;
  }
  return (
    <div className="App">
      {data && (
        <div className="container">
          <ProjectsTable projects={currentData} />
          <div className="bottom-container">
            <Pagination
              totalItems={data.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
              visibleRange={2}
            />
          </div>
        </div>
      )}
    </div>
  );
}
