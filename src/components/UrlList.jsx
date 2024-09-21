import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Url from "./Url";

const UrlList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [top100, setTop100] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTop100 = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      setTop100(response.data.urls);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTop100();
  }, []);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(null);
      setTimeout(() => {
        setActiveIndex(index);
      }, 175);
    }
  };

  const downSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const upSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <Loader w={"60px"} h={"60px"} />
        </div>
      ) : (
        <div className="flex justify-center my-10 px-4 md:px-10">
          {top100.length === 0 ? (
            <div className="text-center py-10 text-slate-800">
              <h1 className="text-3xl">Add some URLs to display.</h1>
            </div>
          ) : (
            <div className="w-3/4 bg-white px-5 shadow-xl rounded-lg">
              {top100.map((url, index) => (
                <div className="border-b border-slate-200" key={index}>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex space-x-3 flex-row py-5 text-slate-800"
                  >
                    <span>
                      <b>{index + 1}</b>
                    </span>
                    <div className="w-full flex justify-between items-center">
                      <span className="truncate">{url.full_url}</span>
                      <span className="text-slate-800 transition-transform duration-300">
                        {activeIndex === index ? upSVG : downSVG}
                      </span>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <div className="pb-5 text-sm text-slate-500">
                      <Url url={url} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UrlList;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Loader from "./Loader";
// import Url from "./Url";

// const UrlList = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [top100, setTop100] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getTop100 = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.get("http://localhost:3000/", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(response.data);
//       setTop100(response.data.urls);
//       setLoading(false);
//     } catch (error) {
//       console.error(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTop100();
//   }, []);

//   const toggleAccordion = (index) => {
//     if (activeIndex === index) {
//       setActiveIndex(null); // Close the currently opened accordion
//     } else {
//       setActiveIndex(null);
//       setTimeout(() => {
//         setActiveIndex(index);
//       }, 175);
//     }
//   };

//   // SVGs for Down and Up icons
//   const downSVG = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       fill="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         fillRule="evenodd"
//         d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   const upSVG = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       fill="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         fillRule="evenodd"
//         d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   return (
//     <>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//           <Loader w={"60px"} h={"60px"} />
//         </div>
//       ) : (
//         <div className="flex justify-center my-10">
//           {top100.length === 0 ? (
//             <div className="text-center py-10 text-slate-800">
//               <h1 className="text-3xl">Add some URLs to display.</h1>
//             </div>
//           ) : (
//             <div className="w-3/4 bg-white px-5 shadow-xl rounded-lg">
//               {top100.map((url, index) => (
//                 <div className="border-b border-slate-200" key={index}>
//                   <button
//                     onClick={() => toggleAccordion(index)}
//                     className="w-full flex space-x-3 flex-row py-5 text-slate-800"
//                   >
//                     <span>
//                       <b>{index + 1}</b>
//                     </span>
//                     <div className="w-full flex justify-between items-center">
//                       <span>{url.full_url}</span>
//                       <span className="text-slate-800 transition-transform duration-300">
//                         {activeIndex === index ? upSVG : downSVG}
//                       </span>
//                     </div>
//                   </button>
//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                       activeIndex === index ? "max-h-screen" : "max-h-0"
//                     }`}
//                   >
//                     <div className="pb-5 text-sm text-slate-500">
//                       <Url url={url} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default UrlList;
