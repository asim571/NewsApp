import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = ({ country = 'us', pageSize = 9, category = 'general' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsPortal`;
    updateNews();
  }, [category, country, pageSize, page]);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e717a95b9f3d4fcf8d0b68ac23f68aed&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      // You could set an error state here and display it to the user
    }
  };

  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='container my=3'>
      <h1 className='text-center' style={{ margin: '30px' }}>News Portal - Top {capitalizeFirstLetter(category)} Headlines</h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading && articles && articles.map((element) => (
          <div key={element.url} className="col-md-4">
            <NewsItem
              title={element.title ? element.title.slice(0, 50) : " "}
              description={element.description ? element.description.slice(0, 90) : " "}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&laquo; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults / pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &raquo;</button>
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;
