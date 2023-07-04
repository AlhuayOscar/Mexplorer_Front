import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ToursGrid from "@/components/ToursGrid";
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


const ResultSearch = ({ tours, name }) => {
    const router = useRouter();
    const [phrase, setPhrase] = useState(name);

    useEffect(() => {
        router.push({
            pathname: '/search/',
            query: { name: phrase },
        });
    }, [phrase]);

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
                <SearchTours tours={tours} />
            </Center>
        </>
    );
};


export async function getServerSideProps(context) {
    await mongooseConnect();
    const { name, categories, sort, ...filters } = context.query;
    let [sortField, sortOrder] = (sort || '_id-desc').split('-');

    const toursQuery = {};
    if (categories) {
        toursQuery.category = categories.split(',');
    }
    if (name) {
        toursQuery['$or'] = [
            { title: { $regex: name, $options: 'i' } },
            { description: { $regex: name, $options: 'i' } },
        ];
    }
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(filterName => {
            toursQuery['properties.' + filterName] = filters[filterName];
        });
    }
    const results = await Tour.find(toursQuery,
        null,
        {
            sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 }
        });
    return {
        props: {
            tours: JSON.parse(JSON.stringify(results)),
            name: name,
        }
    }
}
export default ResultSearch;
