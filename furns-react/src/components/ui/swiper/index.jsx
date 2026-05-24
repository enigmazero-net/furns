import cn from "classnames";
import PropTypes from "prop-types";
import {SliderWrap} from "./swiper.style";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";

const modules = [Autoplay, EffectFade, FreeMode, Navigation, Pagination, Thumbs];

const Slider = ({children, animate, settings, className}) => {
    const sliderOptions = {
        slidesPerView: 1,
        pagination: true,
        navigation: true,
        ...settings
    }

    return (
        <SliderWrap
            animate={animate}
            dots={sliderOptions?.pagination}
            arrows={sliderOptions?.navigation}
        >
            <Swiper
                modules={modules}
                {...sliderOptions}
                className={cn(className)}
            >
                {children}
            </Swiper>
        </SliderWrap>
    );
};

Slider.propTypes = {
    settings: PropTypes.shape({
        navigation: PropTypes.bool,
        pagination: PropTypes.bool,
        slidesPerView: PropTypes.number,
        spaceBetween: PropTypes.number,
        autoplay: PropTypes.bool,
        breakpoints: PropTypes.shape({})
    }),
    animate: PropTypes.bool
};

export {SwiperSlide as Slide};
export default Slider;
