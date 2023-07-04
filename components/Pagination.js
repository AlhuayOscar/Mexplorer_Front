const PaginationControls = ({
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
    disablePreviousPage,
    disableNextPage,
}) => {
    return (
        <div>
            <button onClick={onPreviousPage} disabled={disablePreviousPage}>
                Anterior
            </button>
            <span>
                Página {currentPage} de {totalPages}
            </span>
            <button onClick={onNextPage} disabled={disableNextPage}>
                Siguiente
            </button>
        </div>
    );
};


export default PaginationControls;