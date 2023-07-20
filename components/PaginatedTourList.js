import TourBoxH from "./ToursBoxH";
import PaginationControls from "./Pagination";

const PaginatedTourList = ({ tours, setCurrentPage, currentPage }) => {
    const toursPerPage = 5;
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <PaginationControls
                currentPage={currentPage}
                totalPages={Math.ceil(tours.length / toursPerPage)}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                disablePreviousPage={currentPage === 1}
                disableNextPage={currentPage === Math.ceil(tours.length / toursPerPage)}
            />
            {currentTours.map((product) => (
                <TourBoxH key={product._id} {...product} />
            ))}
        </>
    );
};

export default PaginatedTourList;
