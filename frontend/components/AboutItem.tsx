"use client";

import React from "react";

interface AboutItemProps {
  tabletOnly?: boolean;
}

const AboutItem: React.FC<AboutItemProps> = ({ tabletOnly = false }) => {
  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <h2 className="text-black">About this item</h2>

      <p className="text-black">
        Stylish Design, Vibrant Display: The lightweight aluminum build blends
        effortless style with workout durability, while the vivid 1.97" AMOLED
        display keeps your data easy to read, even under bright sunlight.
      </p>
      <p className="text-black">
        All-in-One Activity Tracking: The Amazfit Bip 6 fitness tracker watch
        offers 140+ workout modes including HYROX Race and Strength Training,
        plus personalized AI coaching and 50m water resistance.
      </p>
      <p className="text-black">
        Up to 14 Days Battery Life: The Amazfit Bip 6 smart watch powers through
        your training and recovery for up to two weeks at a time - no nightly
        charging needed.
      </p>
      <p className="text-black">
        Accurate GPS Tracking & Navigation: Stay on course with free
        downloadable maps and turn-by-turn directions. Support from 5 satellite
        systems ensures precise tracking of every move and fast GPS connection.
      </p>
      <p className="text-black">
        24/7 Health Monitoring: The Amazfit Bip 6 smartwatch provides precise,
        real-time monitoring of heart rate, sleep, blood-oxygen and stress,
        empowering you with actionable insights to optimize your health and
        fitness.
      </p>
    </div>
  );
};

export default AboutItem;
