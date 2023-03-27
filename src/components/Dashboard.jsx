import React, { useState } from "react";
import Axios from "../utils/Axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [prediction, setPrediction] = useState([]);
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
        Axios.post("/api/v1/predict/predict-all", { image: res.data.image }).then((res) => {
          console.log(res);
          setPrediction(res.data.data);
          setBtnDisabled(false);
        }).catch((err) => {
          console.log(err);
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

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-181px)] bg-gray-900 flex flex-col py-6 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-left text-3xl font-extrabold text-white">
          Predict the Image using available CNN models
        </h2>
        <h4
          className="mt-1 text-lg text-gray-300 mb-2 text-left"
          id="file_input_help"
        >
          <strong>Available CNN Models:</strong> RapidNet (Custom Model), VGG16,
          VGG19, InceptionV3, and DenseNet201
        </h4>
        <h4
          className="mt-1 text-base text-gray-500 mb-6 text-left"
          id="file_input_help"
        >
          <strong>Note:</strong> RapidNet is the custom model that was built
          during the project.
        </h4>
        <h4
          className="mt-1 text-lg text-gray-400 mb-12 text-center w-[80%] mx-auto"
          id="file_input_help"
        >
          <strong>Make sure to use any of the following categories:</strong>{" "}
          Domestic Cat, Dog, Bird, Giant Panda, Gold Fish, Car, Starfish, Apple,
          Zebra, Airplane, Flower Pot, Butterfly, Lion, Salt or Pepper Shaker,
          Printer, Traffic Light
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
            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25 disabled:hover:bg-green-500"
              type="submit"
              disabled={btnDisabled}
            >
              Predict
            </button>
            {btnDisabled && (
              <span className="text-white ml-4">Predicting...</span>
            )}
          </form>
        </div>
        {/* Table */}

        {prediction.length > 0 && (
          <div className="flex flex-col mt-4">
          <h2 className="mb-4 text-left text-3xl font-extrabold text-white">
            Predictions
          </h2>
          <table className={btnDisabled ? "w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-900 blur-sm" : "w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-900"}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Model
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Probability
                </th>
              </tr>
            </thead>
            <tbody>
              {prediction.map((pred, index) => (

              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-1 border-gray-900">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {pred.model}
                </th>
                <td className="px-6 py-4">{pred.category}</td>
                <td className="px-6 py-4">{pred.probability}</td>
              </tr>
              ))}
              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        )}
        {/* Table end */}
      </div>

      <Footer />
    </div>
  );
}
