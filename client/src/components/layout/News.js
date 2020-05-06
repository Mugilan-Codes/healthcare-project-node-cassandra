import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    try {
      //todo Put the API Key in Separate file

      const res = await axios.get(
        'http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4a2855e432f147e5b42b39bc96011a68'
      );

      setData(res.data.articles);
    } catch (err) {
      alert('Error in Api Call ' + err.message);
    }
  };

  console.log(data);

  const articles = data.map((article, i) => (
    <div key={i} className='news-profile bg-light'>
      <div>
        <p>{article.source.name}</p>
        <p>
          <Moment format='Do MMM, YYYY'>{article.publishedAt}</Moment>
        </p>
      </div>
      <div>
        <h2>{article.title}</h2>
        <p>
          {article.description}
          <a href={article.url} target='_blank' rel='noopener noreferrer'>
            {' '}
            (Click Here to Read More...)
          </a>
        </p>
      </div>
      <img src={article.urlToImage} alt='' />
    </div>
  ));

  return <Fragment>{articles}</Fragment>;
};

export default News;
