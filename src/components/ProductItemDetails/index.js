// Write your code here

import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const jwtToken = Cookies.get('jwt_token')

class ProductItemDetails extends Component {
  state = {
    id: this.props.match.params.id,
    count: 1,
    detailedProduct: {similarProducts: []},
    isLoading: true,
    isFail: false,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {id} = this.state
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        price: data.price,
        rating: data.rating,
        availability: data.availability,
        description: data.description,
        similarProducts: data.similar_products.map(item => ({
          id: item.id,
          imageUrl: item.image_url,
          title: item.title,
          style: item.style,
          price: item.price,
          description: item.description,
          brand: item.brand,
          totalReviews: item.total_reviews,
          rating: item.rating,
          availability: item.availability,
        })),
      }

      this.setState({detailedProduct: {...updatedData}, isLoading: false})
    } else {
      this.setState({isFail: true, isLoading: false})
    }
  }

  onIncrement = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  getProductItemDetailedView = () => {
    const {detailedProduct, count} = this.state

    return (
      <div className="start-view">
        <img
          src={detailedProduct.imageUrl}
          alt={detailedProduct.title}
          className="img1"
        />
        <div className="start-view-content">
          <h1 className="heading">{detailedProduct.title}</h1>
          <p>
            <span>Rs</span> {detailedProduct.price}/-
          </p>
          <div className="star-content1">
            <p className="star1">
              {detailedProduct.rating} <FaStar />
            </p>
            <p className="review1">{detailedProduct.totalReviews} Reviews</p>
          </div>
          <p>{detailedProduct.description}</p>
          <p>
            <span>Availability</span>: {detailedProduct.availability}
          </p>
          <p>
            <span>Brand</span>: {detailedProduct.brand}
          </p>
          <div className="buttons">
            <BsDashSquare className="button1" onClick={this.onDecrement} />
            <p className="count">{count}</p>

            <BsPlusSquare className="button1" onClick={this.onIncrement} />
          </div>
          <button className="button">ADD TO CART </button>
        </div>
      </div>
    )
  }

  getSimilarProductItems = () => {
    const {similarProducts} = this.state.detailedProduct

    return (
      <ul className="cards-con">
        {similarProducts.map(productDataDetails => (
          <SimilarProductItem
            productDataDetails={productDataDetails}
            key={productDataDetails.id}
            onClick={this.getProductDetails()}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, isFail, detailedProduct} = this.state

    return (
      <>
        <div className="product-details1">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
            </div>
          ) : detailedProduct.length === 1 ? (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                alt="error view"
              />
              <p>Product Not Found</p>
              <button className="button">Continue Shopping</button>
            </div>
          ) : (
            <>
              <Header />
              {this.getProductItemDetailedView()}
              <h1>Similar Products</h1>
              {this.getSimilarProductItems()}
            </>
          )}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
