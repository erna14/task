import React, { Fragment, useState, useEffect } from "react";
import classes from '../design/ProductsPage.module.css'
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function ProductsPage () {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [productsNumber] = useState(5)
  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const filterNameInputHandler = event => {
    setFilterName(event.target.value)
  }

  const filterPriceInputHandler = event => {
    setFilterPrice(event.target.value)
  }

  useEffect(()=>{
    const loginCheck = () => {
      const token = localStorage.getItem('jwt')
      if (!token) {
        navigate('/login')
      }
    }
    loginCheck()
  },[])

  useEffect(()=>{
    const token = localStorage.getItem('jwt');

    const fetchData = async () => {
      try {
        const response = await fetch('https://junior-test.mntzdevs.com/api/products/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()
        console.log('Product Data:', data);

        if (typeof data === 'object' && data !== null) {
          function flattenProducts(prodObjects) {
            const flattenedProducts = [];
        
            function flattenProduct(product) {
              const { linkedProducts, ...rest } = product;
              flattenedProducts.push(rest);
        
              if (linkedProducts) {
                Object.values(linkedProducts).forEach(flattenProduct);
              }
            }
        
            Object.values(prodObjects.products).forEach(flattenProduct);
            return flattenedProducts;
          }

          const manipulateProducts1 = flattenProducts(data)

          function removeDUplicates(products) {
            const seen = new Set();
        
            return products.filter((item) => {
              const duplicate = seen.has(item.name);
              seen.add(item.name);
              return !duplicate;
            });
          }

          const manipulateProducts2 = removeDUplicates(manipulateProducts1)
    
          setProducts(manipulateProducts2);

        } else {
          console.error('API response is not an object:', data);
        }

      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filterName.trim().toLowerCase());
      return nameMatch
    });
    
    setFilteredProducts(filtered);
  }, [filterName]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const priceMatch = Number(product.price) === Number(filterPrice)
      return priceMatch
      
    });
    
    setFilteredProducts(filtered);
  }, [filterPrice]);

  console.log('Filter price: ', filterPrice)


  useEffect(() => {
    const startIdx = (pageNumber - 1) * productsNumber;
    const endIdx = startIdx + productsNumber;
    const paginatedProducts = products.slice(startIdx, endIdx);
    setFilteredProducts(paginatedProducts);
  }, [pageNumber, productsNumber, products]);
  


  const handlePrev = () => {
    if(pageNumber === 1) {
      return
    } 
    
    setPageNumber(pageNumber-1)
    
  }

  const handleNext = () => {
    if(pageNumber === 4) {
      return
    }
    setPageNumber(pageNumber+1)
  }

  console.log(products)

  return (
    <Fragment>
      <Header/>
      <div className={classes.table_container}>
        <h1> PRODUCTS </h1>
        <div className={classes.filter}>
          <label>
            Filter:
            <input
              className={classes.input_filter}
              type="text"
              value={filterName}
              onChange={filterNameInputHandler}
              placeholder="Product name"
            />
            <input
              className={classes.input_filter}
              type="number"
              value={filterPrice}
              onChange={filterPriceInputHandler}
              placeholder="Product price"
            />
          </label>
        </div>

        <table className={classes.products_table}>
          <thead>
            <tr>
              <th> NAME </th>
              <th> PRICE </th>
            </tr>
          </thead>
          { filteredProducts.length === 0 ?
            <tbody>
            {products.map((product, id) => (
                <tr key={id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                </tr>
            ))}
          </tbody> : 
          
          <tbody>
            {filteredProducts.map((product, id) => (
                <tr key={id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                </tr>
            ))}
          </tbody>
          }
          
        </table>

      <div className={classes.paginate_btns_container}>
        <button onClick={handlePrev} className={classes.paginate_btn}> PREV </button>
        <button onClick={handleNext} className={classes.paginate_btn}> NEXT </button>
      </div>

      </div>

    </Fragment>
  )
}

export default ProductsPage