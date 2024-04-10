import React, { useState } from "react";
import styled from "styled-components";

const SwipeTrack = ({ children}) => {
  const [swiper, setSwiper] = useState({
    left: 0,
    originalOffset: 0,
    velocity: 0,
    timeOfLastDragEvent: 0,
    touchStartX: 0,
    prevTouchX: 0,
    beingTouched: false,
  });

  function handleStart(clientX) {
    setSwiper({
      ...swiper,
      originalOffset: swiper.left,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartX: clientX,
      beingTouched: true,
    });
  }
  function handleMove(clientX) {
    if (swiper.beingTouched) {
      const touchX = clientX;
      const currTime = Date.now();
      const elapsed = currTime - swiper.timeOfLastDragEvent;
      const velocity = (20 * (touchX - swiper.prevTouchX)) / elapsed;
      let deltaX = touchX - swiper.touchStartX + swiper.originalOffset;
      if (deltaX > 0) {
        deltaX = 0;
      }
      if (deltaX < -500) {
        deltaX = -500;
      }
      setSwiper({
        ...swiper,
        left: deltaX,
        velocity: velocity,
        timeOfLastDragEvent: currTime,
        prevTouchX: touchX,
      });
    }
  }
  function handleEnd() {
    setSwiper({
      ...swiper,
      velocity: swiper.velocity,
      touchStartX: 0,
      beingTouched: false,
    });
  }

  function handleTouchStart(touchStartEvent) {
    //touchStartEvent.preventDefault();
    handleStart(touchStartEvent.targetTouches[0].clientX);
  }

  function handleTouchMove(touchMoveEvent) {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    handleEnd();
  }

  return (
    <Wrapper
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
    >
      <div
        className="swipeItem-content"
        style={{
          //left: swiper.left + "px",
          transform: `translateX(${swiper.left}px)`,
        }}
      >
        {children}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  height: 4rem;
  .swipeItem-content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 16px 8px;
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default SwipeTrack;
