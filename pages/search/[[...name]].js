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


const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;


const ResultSearch = ({ tours, name, totalPages }) => {
    const router = useRouter();
    const [phrase, setPhrase] = useState(name);
    const [currentPage, setCurrentPage] = useState(1);


    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        // Agregamos el setTimeout aquí
        const timeoutId = setTimeout(() => {
            router.push({
                pathname: "/search/",
                query: { name: phrase, page: currentPage },
            });
        }, 1200); // 2 segundos

        // Limpiamos el timeout si se desmonta el componente o cambian los valores
        return () => clearTimeout(timeoutId);
    }, [phrase, currentPage]);

    console.log("router:", router);
    console.log("phrase:", phrase);
    console.log("currentPage:", currentPage);


    return (
        <>
            <Header />
            <Center>
                <SearchInput
                    autoFocus
                    value={phrase}
                    onChange={ev => setPhrase(ev.target.value)}
                    type="text"
                    placeholder="Busca una actividad..." />
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
        await mongooseConnect();
        const { name, sort, page, ...filters } = context.query;
        let [sortField, sortOrder] = (sort || '_id-desc').split('-');
        const toursQuery = {};
        if (name) {
            toursQuery['$or'] = [
                { name: { $regex: name, $options: 'i' } },
                { nameEng: { $regex: name, $options: 'i' } },
                { description: { $regex: name, $options: 'i' } },
            ];
        }
        if (Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(filterName => {
                toursQuery['properties.' + filterName] = filters[filterName];
            });
        }
        const limit = 9; // Establece el límite a 9 productos por página
        const skip = (Number(page) - 1) * limit;
        const resultsQuery = Tour.find(toursQuery, null, {
            sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
            skip,
            limit,
        });

        const results = await resultsQuery.exec();

        // Obtener el recuento total de paginas
        const totalCount = await Tour.countDocuments(toursQuery);

        const totalPages = Math.ceil(totalCount / limit); // Calcular el número total de páginas.

        console.log("### INICIO DE VALORES ###");
        console.log("name:", name);
        console.log("sort:", sort);
        console.log("page:", page);
        console.log("filters:", filters);
        console.log("sortField:", sortField);
        console.log("sortOrder:", sortOrder);
        console.log("### FIN DE VALORES ###");

        console.log("### INICIO DE CONSULTA ###");
        console.log("toursQuery:", toursQuery);
        console.log("### FIN DE CONSULTA ###");

        console.log("### INICIO DE PAGINACIÓN ###");
        console.log("limit:", limit);
        console.log("skip:", skip);
        console.log("### FIN DE PAGINACIÓN ###");

        console.log("### INICIO DE TOTAL ###");
        console.log("totalCount:", totalCount);
        console.log("totalPages:", totalPages);
        console.log("### FIN DE TOTAL ###");

        return {
            props: {
                tours: JSON.parse(JSON.stringify(results)),
                name: name,
                totalPages: totalPages, // Pasa el valor totalPages al componente
            },
        };
    } catch (error) {
        console.error("Error al obtener los datos del tour:", error);
        return {
            props: {
                tour: null,
                name: null,
                totalPages: null,
            },
        };
    }
}

export default ResultSearch;
