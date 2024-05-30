// Write your code here

import './index.css'
import {Link} from 'react-router-dom'

const SimilarProductItem = props => {
  const {productDataDetails} = props
  const {title, brand, imageUrl, rating, price, id} = productDataDetails

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/products/${id}`} className="link">
      <li className="product-item1">
        <img src={imageUrl} alt="product" className="thumbnail1" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default SimilarProductItem
