import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import { EventData } from "../../types/types";

import styles from "./EventsSlider.module.scss";

interface EventsSliderProps {
  events: EventData[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={styles.sliderContainer}>
      {/* <div className={styles.sliderHeader}>
        <div className={styles.slideCounter}>
          <span className={styles.currentIndex}>01</span> /{" "}
          <span className={styles.totalIndex}>0{events.length}</span>
        </div>
        <div className={styles.navigation}>
          <button className={styles.navButton} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.navButton} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div> */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className={styles.swiperCustom}
        autoHeight={true}
        // breakpoints={{
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //     spaceBetween: 30,
        //   },
        // }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.eventCard}>
              <h3 className={styles.eventYear}>{event.year}</h3>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventsSlider;
