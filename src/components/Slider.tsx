import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Slider = ({ blogs, loading }) => {
    if(loading)
        return <Loading />

    return (
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        spaceBetween={20} 
        breakpoints={{
            0: { slidesPerView: 1 },      // Mobil
            640: { slidesPerView: 2 },    // Tablet
            1024: { slidesPerView: 3 }    // Geniş ekran
        }}
        className="w-full mb-12"
        >
        {blogs.map((item) => (
            <SwiperSlide key={item.id}>
            <Link 
                to={`/blog/${item.slug}`}
                style={{
                width: "100%",
                height: "320px",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                display: "flex",
                alignItems: "flex-end",
                padding: "16px",
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.3)",
                backgroundBlendMode: "darken",
                cursor: "pointer",
                transition: "0.3s"
                }}
            >
                <h2 style={{ fontSize: "18px", fontWeight: "600", textShadow: "0px 2px 5px black" }}>
                    {item.title}
                </h2>
            </Link>
            </SwiperSlide>
        ))}
        </Swiper>
    );
};

export default Slider;
