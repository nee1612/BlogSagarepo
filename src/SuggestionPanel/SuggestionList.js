import React from "react";
import moment from "moment";

function SuggestionList({ suggestions }) {
  console.log(suggestions, "suggestions");
  return (
    <div className="w-full     sticky bottom-1/2 z-50 ">
      {suggestions.map((suggestion, index) => (
        <div className="  flex  justify-center rounded-md ">
          <div
            key={index}
            className=" bg-white    flex items-center justify-between p-2 border-b border-gray-200"
          >
            <div className="flex items-center w-[17rem]">
              {/* {suggestion.Photo ? (
                <img
                  src={suggestion.Photo}
                  className="w-12 h-12 rounded-full"
                />
              ) : ( */}
              <span className="font-bold w-9 h-9 rounded-full flex justify-center items-center text-white  bg-orange-600 text-base">
                {suggestion.Name[0].toUpperCase()}
              </span>
              {/* )} */}
              <div className="ml-2">
                <h3 className="font-semibold">Topic : {suggestion.Name}</h3>
                <p className="text-xs text-gray-500  ">
                  Email :{suggestion.Email}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-xs mr-2">
              {" "}
              {/* {moment(suggestion.CreatedAt).subtract(10, "days").calendar()} */}
              {/* {suggestion.createdAt} */}
              {moment(suggestion.createdAt.toDate()).format("MMM Do YY")}
            </p>
            {/* <p className="text-blue-500">{suggestion.CreatedAt}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestionList;
