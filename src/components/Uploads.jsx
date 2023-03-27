import React, { useEffect, useState } from "react";
import Categories from "../../categories";
import Axios from "../utils/Axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Uploads() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    Axios.get("/api/v1/uploads")
      .then((res) => {
        console.log(res.data.data, "uploads");
        setUploads(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-181px)] bg-gray-900 flex flex-col py-6 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-left text-3xl font-extrabold text-white">
          Your Uploads
        </h2>
        <h4
          className="mt-1 text-lg text-gray-400 mb-2 text-left"
          id="file_input_help"
        >
          All your contributions to the dataset will be listed here.
        </h4>
        {/* Table */}
        <div className="flex flex-col mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-900">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Image Name
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Is Verified?
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-lg">
                  Uploaded At
                </th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((image, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-1 border-gray-900"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {image.image}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900">{Categories[image.category]}</td>
                  <td className="px-6 py-4">
                    {/* create badge for yes and no */}
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${
                        image.isVerified
                          ? "bg-green-400 text-green-800"
                          : "bg-red-400 text-red-800"
                      }`}
                    >
                    {image.isVerified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Intl.DateTimeFormat("default", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                      timeZone: "Europe/London",
                    }).format(new Date(image.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table end */}
      </div>
      <Footer />
    </div>
  );
}
