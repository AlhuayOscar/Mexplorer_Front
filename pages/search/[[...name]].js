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
  const [searchInput, setSearchInput] = useState(name);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      const timeout = setTimeout(() => {
        router.push({
          pathname: "/search/",
          query: { name: searchInput, page: currentPage },
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchInput, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

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

  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          value={searchInput}
          onChange={handleSearchInputChange}
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

export async function getServerSideProps({ query }) {
  try {
    await mongooseConnect();

    let searchInput = query.name || "Tour";
    const regex = new RegExp(searchInput, "i");

    const tours = await Tour.find({ name: regex });

    const serializedTours = tours.map((tour) => {
      const serializedTour = tour.toObject();
      serializedTour._id = serializedTour._id.toString();
      serializedTour.createdAt = serializedTour.createdAt.toISOString();
      return serializedTour;
    });

    return {
      props: {
        tours: serializedTours,
        name: searchInput,
        totalPages: Math.ceil(tours.length / 10),
      },
    };
  } catch (error) {
    return {
      props: {
        tours: ["No hay tour"],
        name: "El servidor no tiene ese Tour o no lo encuentra",
        totalPages: 0,
      },
    };
  }
}

export default ResultSearch;
