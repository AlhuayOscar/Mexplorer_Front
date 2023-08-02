import React from 'react';

const PaginationControls = ({
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
    disablePreviousPage,
    disableNextPage,
}) => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px',
        marginBottom: '25px',
    };

    const buttonStyle = {
        width: '30px',
        height: '30px',
        margin: '5px',
        borderRadius: '50%',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#00abbd',
        color: '#fff',
    };

    const visiblePageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);

    while (visiblePageNumbers.length < 3 && startPage <= endPage) {
        visiblePageNumbers.push(startPage);
        startPage++;
    }

    return (
        <div style={containerStyle}>
            <button
                style={buttonStyle}
                onClick={onPreviousPage}
                disabled={disablePreviousPage}
            >
                &lt;
            </button>
            {visiblePageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    style={
                        pageNumber === currentPage
                            ? activeButtonStyle
                            : buttonStyle
                    }
                    onClick={() => console.log(`Ir a la página ${pageNumber}`)}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                style={buttonStyle}
                onClick={onNextPage}
                disabled={disableNextPage}
            >
                &gt;
            </button>
        </div>
    );
};

export default PaginationControls;
