import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PaginationControls from "@/components/Pagination";
import SearchProducts from "@/components/SearchProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;


const ResultSearch = ({ products, name, totalPages }) => {
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
        router.push({
            pathname: "/search/",
            query: { name: phrase, page: currentPage },
        });
    }, [phrase, currentPage]);

    useEffect(() => {
        setCurrentPage(1); // página 1 al cambiar el nombre de búsqueda
    }, [name]);

    return (
        <>
            <Header />
            <Center>
                <SearchInput
                    autoFocus
                    value={phrase}
                    onChange={ev => setPhrase(ev.target.value)}
                    type="text"
                    placeholder="Lugares para visitar..." />
                <SearchProducts products={products} />
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
    await mongooseConnect();
    const { name, categories, sort, page, pageSize, ...filters } = context.query;
    let [sortField, sortOrder] = (sort || '_id-desc').split('-');

    const productsQuery = {};
    if (categories) {
        productsQuery.category = categories.split(',');
    }
    if (name) {
        productsQuery['$or'] = [
            { title: { $regex: name, $options: 'i' } },
            { description: { $regex: name, $options: 'i' } },
        ];
    }
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(filterName => {
            productsQuery['properties.' + filterName] = filters[filterName];
        });
    }
    const limit = 3; // Establece el límite a 3 productos por página
    const skip = (Number(page) - 1) * limit;
    const resultsQuery = Product.find(productsQuery, null, {
        sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
        skip,
        limit,
    });

    const results = await resultsQuery.exec();

    // Obtener el recuento total de paginas
    const totalCount = await Product.countDocuments(productsQuery);

    const totalPages = Math.ceil(totalCount / limit); // Calcular el número total de páginas.

    return {
        props: {
            products: JSON.parse(JSON.stringify(results)),
            name: name,
            totalPages: totalPages, // Pasa el valor totalPages al componente
        },
    };
}
export default ResultSearch;
