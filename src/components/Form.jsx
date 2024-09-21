import axios from "axios";
import React, { useState, useRef } from "react";
import Loader from "./Loader";
import RejectToast from "./RejectToast";
import SuccessToast from "./SuccessToast";

const Form = () => {
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortened, setShortened] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef(null);

  const shortenURL = async (e) => {
    setShortCode("");
    e.preventDefault();
    setLoading(true);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    const url = document.getElementById("url").value;

    try {
      const response = await axios.post(
        "http://localhost:3000/short_urls",
        {
          full_url: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setShortCode(response.data.short_code);
      setLoading(false);
      setError(false);
      setShortened(true);

      setTimeout(() => {
        setShortened(false);
      }, 2000);
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMessage(error.response.data.errors[0]);

      errorTimeoutRef.current = setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${shortCode}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const redirectToURL = () => {
    if (shortCode) {
      window.open(
        `http://localhost:3000/${shortCode}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-12 justify-center items-center shadow-lg bg-white rounded-xl p-5 sm:w-80 md:w-96 lg:w-1/2 lg:h-96">
        <h1 className="text-center font-medium text-2xl">
          Create a new Short URL
        </h1>
        <form className="w-full">
          <div className="mb-5">
            <label
              htmlFor="url"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Full URL
            </label>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="url"
                id="url"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="https://www.google.com/"
                required
              />
              <button
                onClick={shortenURL}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center"
              >
                {loading ? (
                  <Loader w={"15px"} h={"15px"} />
                ) : (
                  <span>Shorten</span>
                )}
              </button>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="short-url"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Short URL
            </label>
            <input
              type="url"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              readOnly
              placeholder="Your short URL"
              value={shortCode && `http://localhost:3000/${shortCode}`}
            />
          </div>
          <div className="flex sm:flex-row justify-center items-center space-x-2 sm:space-x-8">
            <button
              onClick={() => {
                shortCode && copyText();
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-32 sm:w-auto px-3 py-2.5 text-center flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="4 0 28 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
                />
              </svg>
              Copy
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-32 sm:w-auto px-3 py-2.5 text-center flex items-center justify-center"
              onClick={redirectToURL}
            >
              Visit Short URL
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      {error && <RejectToast setError={setError} message={errorMessage} />}
      {copied && (
        <SuccessToast setCopied={setCopied} message={"Copied to clipboard"} />
      )}
      {shortened && (
        <SuccessToast setShortened={setShortened} message={"Success"} />
      )}
    </>
  );
};

export default Form;
