import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets.js";
import NewsletterBox from "../components/NewsletterBox"

const About = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <div className="w-full md:max-w-[450px] relative">
      {/* Skeleton */}
      {!loaded && (
        <div className="w-full h-[300px] md:h-[350px] bg-gray-300 rounded-md"></div>
      )}

      {/* Actual Image */}
      <img
        className={`w-full md:max-w-[450px] ${loaded ? "block" : "hidden"}`}
        src={assets.about_img}
        alt="About"
        onLoad={() => setLoaded(true)}
      />
    </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Kapada, we bring fashion for everyone—men, women, and kids. Our
            goal is to make shopping simple by offering stylish, comfortable,
            and affordable clothing for all occasions. From casual wear to
            formal outfits, we make sure you find something that matches your
            style and personality.
          </p>
          <p>
            Shopping with us is easy, secure, and enjoyable. We regularly update
            our collections with the latest trends while keeping timeless
            classics in stock. Whether you’re updating your wardrobe or choosing
            outfits for your family, Kapada is here to be your trusted fashion
            destination.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Kapada is to make fashion accessible, affordable, and
            enjoyable for everyone. We are committed to offering quality
            clothing for men, women, and kids that combines style, comfort, and
            value. By providing a seamless online shopping experience and
            staying updated with the latest trends, we strive to help
            individuals and families express their personality with confidence
            through fashion.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Kapada, we ensure every product meets high standards of comfort,
            durability, and style.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Kapada makes shopping easy with a simple process, secure checkout,
            and reliable delivery.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At Kapada, we are dedicated to providing friendly support and quick
            solutions to make your shopping experience worry-free.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
