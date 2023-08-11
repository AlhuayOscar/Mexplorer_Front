import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PaginationControls from "@/components/Pagination";
import SearchTours from "@/components/SearchTours";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;

const ResultSearch = ({ tours, name, totalPages }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("Tour"); // Cambié el nombre de la variable a "searchInput"
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    router.push({
      pathname: "/search/",
      query: { name: searchInput, page: currentPage },
    });
  }, [searchInput, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [name]);
  console.log("Esto es name en pagina 1", name);

  useEffect(() => {
    const storedSearchInput = localStorage.getItem("searchInput");
    if (storedSearchInput) {
      setSearchInput(storedSearchInput);
    }
  }, []);

  const handleSearchInputChange = (ev) => {
    const newValue = ev.target.value;
    setSearchInput(newValue);
    localStorage.setItem("searchInput", newValue);
  };

  console.log("Contexto en el cliente:", router.query);
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          value={searchInput}
          onChange={handleSearchInputChange} // Actualizado el manejador de cambios
          type="text"
          placeholder="Busca una actividad..."
        />
        <SearchTours tours={tours} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          disablePreviousPage={currentPage === 1}
          disableNextPage={currentPage === totalPages || totalPages === 0}
        />
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  console.log(
    "Esto es el context-query antes de la peticion a DB",
    context.query
  );
  try {
    await mongooseConnect();
    const { name, categories, sort, page, pageSize, ...filters } =
      context.query;
    let [sortField, sortOrder] = (sort || "_id-desc").split("-");
    console.log("Esto es el context-query", context.query);
    const toursQuery = {};
    if (categories) {
      toursQuery.category = categories.split(",");
    }
    if (name) {
      toursQuery["$or"] = [
        { name: { $regex: name, $options: "i" } },
        { description: { $regex: name, $options: "i" } },
      ];
    }
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((filterName) => {
        toursQuery["properties." + filterName] = filters[filterName];
      });
    }
    const limit = 3;
    const skip = (Number(page) - 1) * limit;
    const resultsQuery = Tour.find(toursQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
      skip,
      limit,
    });

    const results = await resultsQuery.exec();

    const totalCount = await Tour.countDocuments(toursQuery);
    const totalPages = Math.ceil(totalCount / limit);

    console.log("###########################");

    return {
      props: {
        tours: JSON.parse(JSON.stringify(results)),
        name: name,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    console.error("An error occurred:", error);

    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again later.",
    });

    return {
      props: {
        tours: [],
        name: "The server didn't get any tour",
        totalPages: 1,
      },
    };
  }
}

export default ResultSearch;
