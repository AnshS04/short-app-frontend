import React from "react";

const Url = (props) => {
  const { url } = props;

  const redirectToURL = () => {
    window.open(
      `http://localhost:3000/${url.short_code}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div className="flex flex-col px-7 sm:flex-row sm:space-x-20 space-y-4 sm:space-y-0 justify-center items-start sm:items-center">
        <span className="text-center sm:text-left">
          <b>Shortcode</b> - {url.short_code}
        </span>
        <span className="text-center sm:text-left">
          <b>Click Count</b> - {url.click_count}
        </span>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={redirectToURL}
        >
          Visit URL
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
    </>
  );
};

export default Url;