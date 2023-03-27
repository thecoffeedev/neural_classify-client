import React, { useContext } from "react";

import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Landing() {
  const [contextUser, _] = useContext(UserContext);
  
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-177px)] bg-gray-900 flex flex-row flex-grow justify-center align-middle py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-[80vw] flex flex-row flex-grow justify-center flex-wrap-reverse">
          <div className="w-1/2 min-w-[24rem] py-10 px-4 flex flex-col justify-center">
            <h1 className="text-4xl text-white font-bold text-center leading-normal">
              Welcome to <span className="text-gray-900 bg-white rounded-lg">&nbsp;Neural&nbsp;<br /> &nbsp;Classify&nbsp;</span>
            </h1>
            <p className="text-white text-center pt-10">
              Predict your images with Powerful AI Models which includes RapidNet (Custom Model), VGG16, VGG19, InceptionV3, and DenseNet201 trained in 16 different categories. The Categories includes Domestic Cat, Dog, Bird, Giant Panda, Gold Fish, Car, Starfish, Apple, Zebra, Airplane, Flower Pot, Butterfly, Lion, Salt or Pepper Shaker, Printer, and Traffic Light.<br />
              You can also upload your own images for training and testing. The Uploded images will be verified by the available models and the results will be displayed.
            </p>

            <div className="flex flex-row justify-center pt-10">
              {!contextUser.authToken && (
                <button className="bg-blue-500 text-white px-10 py-2 rounded-lg" onClick={() => navigate('/signup')}>
                Sign Up
              </button>)}
            </div>
          </div>
          <div className="w-1/2 min-w-[24rem] px-16 py-10">
            <div className="flex flex-col justify-center">
              <CpuChipIcon className="h-80 w-80 text-white mx-auto" />

              <h1 className="text-4xl text-white font-bold text-center pt-5">
                The Mesh for Computer Vision
              </h1>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
