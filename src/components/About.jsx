import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-177px)] bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            About
          </h2>
          <p className="mt-2 text-center text-lg text-gray-400">
            Neural Classify is a web application that uses machine learning to classify images. It uses a neural network to classify images into 16 different categories. The neural network is trained using the ImageNet dataset. We have a total of 5 CNN models to predict and verify images. The models are RapidNet (Custom model), VGG16, VGG19, InceptionV3, and DenseNet201. This web application is developed using ReactJS, NodeJS (ExpressJS), and MongoDB as a part of the final year project (Dissertation Project) of the MSc. Computer Science on the topic "A scrutiny of the effectiveness of various variations of Convolutional Neural Networks" at the Coventry University, UK. The project is supervised by Dr. Darren Imrie and Dr. Zina Jerjees. The project is developed by the Anandha Narayanan Balu.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
