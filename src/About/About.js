import React from "react";
import Lottie from "lottie-react";
import aboutLottie from "../assets/AboutUs.json";

const About = () => {
  return (
    <div>
      <section class="px-2 py-10 md:px-0 mt-[10%]">
        <div class="mx-auto max-w-[85%]">
          <div class="md:flex md:items-center md:justify-center md:space-x-14 ">
            <div className="  mt-10 md:mt-0 backdrop-blur-lg border py-[50px] rounded-md    ">
              <div className="flex justify-center">
                <div>
                  <blockquote className="">
                    <p class=" z-40 text-xl text-justify text-black font-semibold md:mx-[3rem] lg:mx-2 px-3 ">
                      Welcome to BlogSaga, a vibrant platform for you to share
                      your thoughts, ideas, and stories with the world. We're
                      thrilled to have you here as part of our growing community
                      of writers and readers. At BlogSaga, we believe that
                      everyone has a unique perspective to offer, and every
                      voice deserves to be heard. This is the place where your
                      creativity and expertise can shine. Whether you're a
                      seasoned writer or just getting started, we invite you to
                      be a part of our blog family.
                    </p>
                  </blockquote>
                  <p class="mt-7 text-lg font-semibold text-black md:mx-[3rem] lg:mx-2 px-3">
                    Neeraj
                  </p>
                  <p class="mt-1 text-base text-black md:mx-[3rem] lg:mx-2 px-3">
                    Web Developer{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
