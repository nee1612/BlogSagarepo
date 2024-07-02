import React from "react";
import moment from "moment";
import "./suggestion.css";

function SuggestionList({ suggestions, setShowSuggestions, showSuggestions }) {
  console.log(suggestions, "suggestions");
  return (
    <div className=" posCenter z-50  fixed  right-[37%]    ">
      <div className="main-div bg-[#379777] bg-opacity-95 pt-10 pb-3 px-3 relative rounded-md   ">
        <div className="  absolute top-3 right-3 rounded bg-[#0e4633] hover:bg-[#4b625a] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F3F7EC"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x"
            onClick={() => setShowSuggestions(!showSuggestions)}
            cursor={"pointer"}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className=" rounded-md backdrop-blur-md   overflow-hidden border border-slate-300  max-h-[20.3rem] overflow-y-auto ">
          {suggestions.map((suggestion, index) => (
            <div className=" bg-[#F5F7F8]  flex  justify-center border-b border-gray-200        ">
              <div
                key={index}
                className=" p-2 py-3  "
                // className=" bg-white   p-2 border-b border-gray-200 "
              >
                <div className="flex items-center w-[19rem] listDiv">
                  <span className="font-bold w-9 h-9 rounded-full flex justify-center items-center text-white  bg-orange-600 text-base">
                    {suggestion.Email[0].toUpperCase()}
                  </span>
                  <div className="ml-2 w-[calc(100%-36px)]">
                    <div className=" flex justify-between items-center   ">
                      <h3 className="font-semibold">
                        Topic : {suggestion.Name}
                      </h3>
                      <p className="text-gray-400 text-xs mr-2">
                        {moment(suggestion.createdAt.toDate()).format(
                          "MMM Do YY"
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500  ">
                      Email :{suggestion.Email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestionList;
