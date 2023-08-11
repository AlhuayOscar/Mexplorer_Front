import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PaginationControls from "@/components/Pagination";
import SearchTours from "@/components/SearchTours";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2"; // Import SweetAlert
const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;

const ResultSearch = ({ tours, name, totalPages }) => {
  const router = useRouter();
  const [phrase, setPhrase] = useState("Xcaret");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(
    "Esto es son varios valores",
    tours,
    "name:",
    name,
    "Pages:",
    totalPages
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    router.push({
      pathname: "/search/",
      query: { name: phrase, page: currentPage },
    });
  }, [phrase, currentPage]);
  console.log("Esto es name", name);

  useEffect(() => {
    setCurrentPage(1); // página 1 al cambiar el nombre de búsqueda
  }, [name]);
  console.log("Esto es name", name);
  console.log("Esto es phrase", name);
  console.log("Esto es la pagina", currentPage);
  console.log("Esto es query");
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          type="text"
          placeholder="Busca una actividad..."
        />
        <SearchTours tours={tours} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          disablePreviousPage={currentPage === 1} // Desactiva el botón de página anterior cuando currentPage sea 1
          disableNextPage={currentPage === totalPages || totalPages === 0} // Desactivar el botón de página siguiente cuando currentPage sea igual a totalPages o totalPages sea 0
        />
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    await mongooseConnect();
    const { name, categories, sort, page, pageSize, ...filters } =
      context.query;
    let [sortField, sortOrder] = (sort || "_id-desc").split("-");
    console.log("Esto es name", name);

    const toursQuery = {};
    if (categories) {
      toursQuery.category = categories.split(",");
    }
    if (name) {
      toursQuery["$or"] = [
        { name: { $regex: name, $options: "i" } },
        { description: { $regex: name, $options: "i" } },
      ];
      console.log("Esto es name", name, toursQuery[0]);
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
    console.log(
      "Esto es la info del GetServersideProps",
      name,
      categories,
      sort,
      page,
      pageSize,
      filters
    );

    const results = await resultsQuery.exec();
    console.log(results[0]);

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
        name: "",
        totalPages: 0,
      },
    };
  }
}

export default ResultSearch;
