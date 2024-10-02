import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

   
    useEffect(() => {
        console.log("Card data:", data); 
    }, [data]);

   
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className='cardContainer'>
            {currentData.length > 0 ? (
                currentData.map((curItem, index) => (
                    curItem.urlToImage && ( 
                        <div className='card' key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <p style={{marginTop: "20px" , borderBottom: "2px solid black"}} ><b style={{color:"red"}}>Author</b> : {curItem.author}</p>
                            <div className='content'>
                                <a className='title' onClick={() => window.open(curItem.url)}>{curItem.title}</a>
                                <p>{curItem.description}</p>
                                <button onClick={() => window.open(curItem.url)}>Read More</button>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p>No data available</p> 
            )}

            
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
