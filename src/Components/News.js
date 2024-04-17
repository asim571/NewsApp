import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsPortal`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e717a95b9f3d4fcf8d0b68ac23f68aed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
      // You could set an error state here and display it to the user
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = () => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }), this.updateNews);
  }

  handleNextClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.updateNews);
  }

  render() {
    return (
      <div className='container my=3'>
        <h1 className='text-center' style={{ margin: '30px' }}>News Portal - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
            return <div key={element.url} className="col-md-4"><NewsItem title={element.title ? element.title.slice(0, 50) : " "} description={element.description ? element.description.slice(0, 90) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /></div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}

export default News;
