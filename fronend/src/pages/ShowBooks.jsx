import React, { useEffect, useState } from 'react'

import axios from 'axios'

import Back from '../components/Back'

import Spinners from '../components/Spinners'

import { useParams } from 'react-router-dom'

const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setBook(response.data)
      setLoading(false);

    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }, [])
  return (
    <div className='p-4'>
      <Back />
      <h1 className='text-3x1 my-4'> book detail</h1>
      {loading ? (<Spinners />) : (
        <div class="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">

          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>ID</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>TITLE</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>AUTHOR</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>PUBLISH-YEAR</span>
            <span>{ book.publishYear }</span>
          </div>
          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>CREATED-YEAR</span>
            <span>{ new Date(book.createdAt).toString() }</span>
          </div>
          <div className='my-4'>
            <span className = 'text-xl mr-4 text-gray-500 '>UPDATED-YEAR</span>
            <span>{ new Date(book.updatedAt).toString() }</span>
          </div>

        </div>
      )}
    </div>
  )
}

export default ShowBooks
