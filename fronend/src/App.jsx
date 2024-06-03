import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatBooks from "./pages/CreatBooks";
import EditBook from "./pages/EditBook";
import ShowBooks from "./pages/ShowBooks";
import DeleteBook from "./pages/DeleteBook";
import Tailwind from "./pages/tailwind";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreatBooks />} />
      <Route path="/books/details/:id" element={<ShowBooks />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/tailwind" element={<Tailwind />} />
    </Routes>
  );
};

export default App;
