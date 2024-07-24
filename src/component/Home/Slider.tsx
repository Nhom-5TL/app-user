import React, { useEffect, useState, useRef } from 'react';
import slide01 from '/src/assets/images/0.jpg';
import slide02 from '/src/assets/images/02.jpg';
import slide03 from '/src/assets/images/03.jpg';
import './Slider.css';

const ImageSlider = () => {
  const slides = [slide01, slide02, slide03];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<number | null>(null);

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow();
  }, []);

  const startSlideShow = () => {
    slideInterval.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    stopSlideShow();
    startSlideShow();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    stopSlideShow();
    startSlideShow();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    stopSlideShow();
    startSlideShow();
  };

  return (
    <section className="section-slide">
      <div className="slider">
        <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index} style={{ backgroundImage: `url(${slide})` }}>
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div className="layer-slick1 animated visible-false" data-appear="fadeInDown" data-delay={0}>
                    <span className="ltext-101 cl2 respon2">Collection 2018</span>
                  </div>
                  <div className="layer-slick1 animated visible-false" data-appear="fadeInUp" data-delay={800}>
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">NEW SEASON</h2>
                  </div>
                  <div className="layer-slick1 animated visible-false" data-appear="zoomIn" data-delay={1600}>
                    <a href="product.html" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
