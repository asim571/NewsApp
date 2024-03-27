import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category:'general' 
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
    }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsPortal`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e717a95b9f3d4fcf8d0b68ac23f68aed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
        articles : parsedData.articles,
        totalResults: parsedData.totalResults,
        loading:false})
  }

  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async () =>{
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  }

  handleNextClick = async ()  =>{
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();
  }

  render() {
    return (
      <div className='container my=3'>        
        <h1 className='text-center' style={{margin: '30px'}}>News Portal - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div key={element.url} className="col-md-4"><NewsItem title={element.title?element.title.slice(0, 50):" "} description={element.description?element.description.slice(0, 90):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/></div>
        })} 
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    )
  }
}
export default News
