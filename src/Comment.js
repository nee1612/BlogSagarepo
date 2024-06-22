import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import moment from "moment";

function Comment({
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  handleSubmit,
  currentUser,
  handleDeleteC,
}) {
  return (
    <>
      <div className=" flex justify-center mt-3  ">
        <div className=" shadow-lg w-[calc(100%-10%)] rounded-md">
          <div className="flex justify-center  mt-4">
            <p className="w-[100%]  px-4 sm:p-3 font-black text-xl sm:text-2xl md:text-3xl font-mono">
              Add a new Comment
            </p>
          </div>
          <div className="flex items-center justify-center   ">
            <form
              onSubmit={handleSubmit}
              className=" w-[100%]  sm:flex sm:gap-2  p-3 "
            >
              <input
                type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                className="sm:flex-1 w-full  border-solid border-black border-2 rounded-lg  outline-none bg-transparent text-xs text-gray-800 p-3 my-2"
                placeholder="Type your comments here..."
              />
              <button
                type="submit"
                className="border-none outline-none bg-black text-base text-white   font-semibold sm:font-bold sm:py-0 my-2 py-1 px-5  rounded-md    sm:rounded-lg"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 border-b-[1px] border-gray-300 pb-5 ">
        <div className="w-[90%] ">
          <p className=" pl-2 font-bold text-3xl font-mono">Comments...</p>
        </div>
      </div>
      <div className="">
        <div className=" flex justify-center  rounded-md  mt-4  z-0  ">
          <div className="flex justify-center w-[100%]">
            <div className="h-[100%] overflow-y-auto p-3">
              {messages.map((message) => (
                <div key={message.id} className=" flex-col  ">
                  <p className="font-bold flex items-start   gap-1   ">
                    <div className="flex items-start gap-3 mt-2 pb-4 ">
                      <div className="pt-2">
                        {message.photoURL ? (
                          <img
                            className="rounded-full w-[25px]  sm:w-7  "
                            src={message.photoURL}
                          />
                        ) : (
                          <div className="w-[24px] h-[25px] sm:w-7   sm:h-7  flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-white text-black text-sm sm:text-lg font-bold">
                            {message.user[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="w-[calc(100vw-90px)] lmobile:w-[calc(100vw-80px)] sm:w-[calc(100vw-100px)] md:w-[calc(100vw-120px)] lg:w-[calc(100vw-180px)] xl:w-[calc(100vw-160px)] 2xl:w-[calc(100vw-200px)]  ">
                        <div className="border-[1.5px] rounded-md border-gray-200 bg-slate-100  shadow-sm ">
                          <div className=" flex  items-center gap-2 text-lg sm:text-xl px-2 pt-2 ">
                            {message.user}:
                            <p className="font-medium text-sm">
                              {message.createdAt !== null
                                ? moment(message.createdAt.toDate()).fromNow()
                                : "a few seconds ago"}
                            </p>
                            {message.userId === currentUser.uid && (
                              <RiDeleteBin7Fill
                                style={{ fill: "black" }}
                                onClick={() => handleDeleteC(message.id)}
                              />
                            )}
                          </div>
                          <div className="text-base font-medium  p-2">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
