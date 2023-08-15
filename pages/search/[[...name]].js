import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import SearchTours from "@/components/SearchTours";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import PaginatedTourList from "@/components/PaginatedTourList";
import { useTranslation } from "react-i18next";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;

const ResultSearch = ({ tours, name }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(name);
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setShouldRedirect(true);
  }, [searchInput]);

  useEffect(() => {
    if ((searchInput === "" || !searchInput) && shouldRedirect) {
      router.push("/search/Tour");
      setShouldRedirect(false);
    }
  }, [searchInput, shouldRedirect]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`/search/${searchInput}`);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSearchInputChange = (ev) => {
    const newValue = ev.target.value;
    setSearchInput(newValue);
    setCurrentPage(1);

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
          placeholder={t("Busca una actividad...")}
        />

        <PaginatedTourList
          tours={tours}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Center>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    await mongooseConnect();

    let searchInput = params.name || "";
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
      },
    };
  } catch (error) {
    return {
      props: {
        tours: ["No hay tour"],
        name: "El servidor no tiene ese Tour o no lo encuentra",
      },
    };
  }
}

export default ResultSearch;
