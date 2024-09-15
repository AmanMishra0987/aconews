import React, { useState } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Card = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page

    // Calculate the index of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the data to get only the items for the current page
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className='cardContainer'>
            {currentData.length > 0 ? (
                currentData.map((curItem, index) => (
                    curItem.urlToImage && ( // Only render if the image exists
                        <div className='card' key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <div className='content'>
                                <a className='title' onClick={() => window.open(curItem.url)}>{curItem.title}</a>
                                <p>{curItem.description}</p>
                                <button onClick={() => window.open(curItem.url)}>Read More</button>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p>No data available</p> // Show a message if no data is available
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => handlePageChange('previous')}
                    disabled={currentPage === 1}>
                    Previous
                </button>

                <span className="page-counter">Page {currentPage} of {totalPages}</span>

                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Card;
