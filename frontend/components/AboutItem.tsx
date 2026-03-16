"use client";

import React from "react";

interface AboutItemProps {
  tabletOnly?: boolean;
}

const aboutItems = [
  `Stylish Design, Vibrant Display: The lightweight aluminum build blends effortless style with workout durability, while the vivid 1.97" AMOLED display keeps your data easy to read, even under bright sunlight.`,
  `All-in-One Activity Tracking: The Amazfit Bip 6 fitness tracker watch offers 140+ workout modes including HYROX Race and Strength Training, plus personalized AI coaching and 50m water resistance.`,
  `Up to 14 Days Battery Life: The Amazfit Bip 6 smart watch powers through your training and recovery for up to two weeks at a time - no nightly charging needed.`,
  `Accurate GPS Tracking & Navigation: Stay on course with free downloadable maps and turn-by-turn directions. Support from 5 satellite systems ensures precise tracking of every move and fast GPS connection.`,
  `24/7 Health Monitoring: The Amazfit Bip 6 smartwatch provides precise, real-time monitoring of heart rate, sleep, blood-oxygen and stress, empowering you with actionable insights to optimize your health and fitness.`,
];

const AboutItem: React.FC<AboutItemProps> = ({ tabletOnly = false }) => {
  return (
    <div
      className={ 
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <hr
        className={`border-surface-1 ${tabletOnly ? "" :  "mt-[20px]"} mb-[14px]`}
      />

      <h2 className="text-[19.4px] leading-6 text-default font-bold mb-[5px]">
        About this item
      </h2>
      <div className="flex text-default flex-col gap-[4px]">
        {aboutItems.map((text, i) => (
          <p key={i} className="text-[13px] leading-5">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutItem;
