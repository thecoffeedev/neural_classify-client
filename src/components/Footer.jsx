import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 pt-1 pb-6">
      <div className="container mx-auto px-4">
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-8/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-200 font-semibold py-1">
              Made with 💖 in coding for Masters Project @ Coventry University by{" "}
              <a
                href="https://www.thecoffeedev.com"
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
              >
                Anandha Narayanan Balu
              </a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}