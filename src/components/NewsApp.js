import React, { useEffect, useState } from 'react'
import Card from './CardDetails'
import './index.css';

const NewsApp = () => {

    const [search,setSearch] = useState("india");
    const [newsData,setNewsData] = useState([]);
    const API_KEY = 'd5b6de93e05cabaf9989be51a44690ef';
    
    const getData = async()=>{
        const response = await fetch(`https://gnews.io/api/v4/search?q=${search}&apikey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        setNewsData(jsonData.articles);
        
    }
    useEffect(()=>{
        getData()
    },[search])

    const handleInput = (e) =>{
        console.log(e.target.value); 
        setSearch(e.target.value);
    }
    const userInput = (e)=>{
        setSearch(e.target.value);
        console.log(userInput);
        
    }

  return (
    <div>
        <div>
            <nav>
                <div>
                    <h1>Trending News</h1>
                </div>
                
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' onChange={handleInput} value={search} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div className='head'>
                <p>Stay update with TrendyNews</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>
           <div>
                <Card data={newsData}/>
           </div>
        </div>
    </div>
  )
}

export default NewsApp