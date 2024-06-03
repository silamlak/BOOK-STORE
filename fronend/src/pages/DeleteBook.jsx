import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Back from "../components/Back";
import Spinners from "../components/Spinners";
const DeleteBook = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleDelete = () => {
    setLoading(true)
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }
  return (
    <div className="p-4">
      <Back />
      <h1 className='text-3x1 my-4'>delete book</h1>
      {loading ? (<Spinners />) : (
        <div className="flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2x1">Are you sure you want to delete this book?</h3>
          <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDelete}>
            yes delete it!
          </button>
        </div>
      )}
    </div>
  )
}

export default DeleteBook
