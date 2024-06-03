import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Back from "../components/Back";
import Spinners from "../components/Spinners";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading true to fetch data initially
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const bookData = response.data; // Assuming the response contains book data
        setAuthor(bookData.author);
        setTitle(bookData.title);
        setPublishYear(bookData.publishYear);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        alert("An error occurred while fetching book data.");
        setLoading(false);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]); // Run this effect whenever the id changes

  const handleEditSave = () => {
    setLoading(true);

    const data = {
      title,
      author,
      publishYear,
    };

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while saving the book.");
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <Back />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinners />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 border-sky-300 m-8" onClick={handleEditSave}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
