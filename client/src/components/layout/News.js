import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

const News = () => {
  const reloadPage = () => window.location.reload(false);

  const [data, setData] = useState([]);

  if (localStorage.token) {
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const apiCall = async () => {
      try {
        //todo Put the API Key in Separate file

        const res = await axios.get(
          'http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4a2855e432f147e5b42b39bc96011a68'
        );

        setData(res.data.articles);
      } catch (err) {
        reloadPage();
        console.error(err.message);
      }
    };

    apiCall();
  }, []);

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

  const pStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '0.7rem',
  };

  const aStyle = {
    margin: 3,
    fontSize: '0.9rem',
  };

  return (
    <Fragment>
      <h1 className='text-primary my-1'>Latest Healthcare News in India</h1>
      {articles}
      <p style={pStyle}>
        Live News fetched from{' '}
        <a style={aStyle} href='https://newsapi.org/'>
          NewsAPI
        </a>
      </p>
    </Fragment>
  );
};

export default News;
