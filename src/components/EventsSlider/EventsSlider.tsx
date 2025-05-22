import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EventData } from "../../types/types";

import styles from "./EventsSlider.module.scss";

interface EventsSliderProps {
  events: EventData[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={styles.container}>
      <div
        ref={navigationPrevRef}
        className={`${styles.prev_button} ${isBeginning ? styles.hidden : ""}`}
      ></div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={"auto"}
        centeredSlides={false}
        pagination={{
          type: "bullets",
          clickable: true,
          el: `.${styles.mobile_pagination}`,
        }}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            centeredSlides: false,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 30,
          },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide_content}>
              <h3 className={styles.year}>{event.year}</h3>
              <p className={styles.description}>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className={styles.mobile_pagination}></div>
      </Swiper>
      <div
        ref={navigationNextRef}
        className={`${styles.next_button} ${isEnd ? styles.hidden : ""}`}
      ></div>
    </div>
  );
};

export default EventsSlider;
