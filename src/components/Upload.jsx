import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from '../../categories';
import Axios from "../utils/Axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Upload() {
  const navigate = useNavigate();

  const [image, setImage] = useState({ preview: "", data: "" });
  const [category, setCategory] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log("img", img);
    setImage(img);
  };

  const handleSubmit = async (e) => {
    setBtnDisabled(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    Axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        Axios.post("/api/v1/uploads/dataset", { image: res.data.image, category: category })
          .then((res) => {
            console.log(res);
            setBtnDisabled(false);
            navigate("/uploads");
          })
          .catch((err) => {
            console.log(err);
            setBtnDisabled(false);
          });
        console.log(res);
        // setStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
        setBtnDisabled(false);
      });

    // if (response) setStatus(response.statusText);
  };

  useEffect(() => {
    console.log("category", category);
  }, [category]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-181px)] bg-gray-900 flex flex-col py-6 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-left text-3xl font-extrabold text-white">
          Upload Images to the dataset for training the Models
        </h2>
        <h4
          className="mt-1 text-lg text-gray-400 mb-6 text-center w-[80%] mx-auto"
          id="file_input_help"
        >
          <strong>Make sure to choose any of the following categories:</strong>{" "}
          Domestic Cat, Dog, Bird, Giant Panda, Gold Fish, Car, Starfish, Apple,
          Zebra, Airplane, Flower Pot, Butterfly, Lion, Salt or Pepper Shaker,
          Printer, Traffic Light
        </h4>
        <h4
          className="mt-1 text-lg text-gray-400 mb-10 text-center w-[80%] mx-auto"
          id="file_input_help"
        >
          <strong>Note:</strong>{" "}
          Name the image short and simple before uploading it.
        </h4>
        <div className="sm:mx-auto sm:w-full sm:max-w-md h-full">
          <form onSubmit={handleSubmit} className="">
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG, JPG or Webp (MAX. 800x400px).
            </p>
            {image.preview && (
              <div className="flex items-center w-full justify-center h-[380px] border-2 border-white rounded-2xl mb-2 mt-4">
                <img src={image.preview} className="max-h-[360px]" />
              </div>
            )}

            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="countries"
              defaultValue={""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setCategory(e.target.value)}
            >
              <option>Choose a Category</option>
              {Object.keys(Categories).map((key) => (
                <option key={key} value={key}>{Categories[key]}</option>
              ))}
            </select>
            <p
              className="mt-2 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Select the correct category of the image you are uploading.
            </p>

            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25 disabled:hover:bg-green-500"
              type="submit"
              disabled={btnDisabled || !category || !image.preview}
            >
              Upload
            </button>
            {btnDisabled && (
              <span className="text-white ml-4">Uploading...</span>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
