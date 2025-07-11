import React from 'react'
import {Row , Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useGetProductsQuery} from '../slices/productApiSlice'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'

function HomeScreen() {

  const {pageNumber,keyword} = useParams()

  const {data : products , isLoading , error} = useGetProductsQuery()

  return (
    <>
        <h1>Latest Products</h1>

        {
          isLoading ?
          <Loader/>
          :
          error ?
          <Message variant='danger'>{error?.data?.message}</Message>
          :
          <>
          
            <Row>

              {
                products?.products?.map((product,index)=>(
                  <Col sm={12} md={6} lg={4} xl={3} key={index}>

                      <Product product={product}/>

                  </Col>
                ))
              }

            </Row>

          </>
        }

    </>
  )
}

export default HomeScreen