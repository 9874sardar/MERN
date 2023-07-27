import React from 'react'
import "../styles.css"
import { API } from '../backend';
import Base from './Base';

const Home = () => {
  console.log("API is ",API);
  return (
    <Base>
      <div className='row'>
        <div className='col-4'>
          <button className='btn btn-danger'>TEST</button>
        </div>
        <div className='col-4'>
          <button className='btn btn-danger'>TEST</button>
        </div>
        <div className='col-4'>
          <button className='btn btn-danger'>TEST</button>
        </div>

      </div>
    </Base>
  )
}

export default Home