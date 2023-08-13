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
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setShouldRedirect(true); // Cambiamos shouldRedirect a true cuando searchInput cambia
  }, [searchInput]);

  useEffect(() => {
    if ((searchInput === "" || !searchInput) && shouldRedirect) {
      router.push("/search/Tour");
      setShouldRedirect(false);
    }
  }, [searchInput, shouldRedirect]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentPage === 1) {
        router.push(`/search/${searchInput}`);
      }
    }, 200); // Cambia el tiempo de espera según tus necesidades

    return () => clearTimeout(timeout);
  }, [searchInput, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  useEffect(() => {
    const storedSearchInput = searchInput;
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search/${searchInput}`);
            }
          }}
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

export async function getServerSideProps({ params }) {
  try {
    await mongooseConnect();

    let searchInput = params.name || "Tour";
    const regex = new RegExp(searchInput, "i");

    const limit = 6; // Número de tours por página
    const page = params.page || 1; // Página actual, puedes obtenerla de los parámetros si es necesario
    const skip = (page - 1) * limit; // Cantidad de documentos a omitir

    const tours = await Tour.find({ name: regex }).skip(skip).limit(limit); // Limitando los resultados por página

    const totalTours = await Tour.countDocuments({ name: regex }); // Contar total de documentos que coinciden
    const totalPages = Math.ceil(totalTours / limit); // Calcular el número total de páginas

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
        totalPages: totalPages, // Pasa el valor de totalPages al componente
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
