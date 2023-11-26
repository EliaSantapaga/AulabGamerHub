import Nier from "../assets/NieR Automata.jpg";
import Horizon from "../assets/Horizon Zero Dawn.jpg";
import Ori from "../assets/Ori and the Will of the Wisps.png";
import EldenRing from "../assets/Elden Ring.jpg";
import Sekiro from "../assets/Sekiro.jpg";
import Stray from "../assets/Stray.jpg";
import ForzaHorizon from "../assets/Forza Horizon V.jpg";
import DeadCells from "../assets/Dead Cells.jpg";
import { DefaultSwiper, SwiperSlide } from "./DefaultSwiper";

function HomeSlider() {
  return (
    <section className="container-fluid game-list mt-5">
      <div className="row">
        <div className="col-12 p-0">
          <div className="swiper">
            <div className="swiper-wrapper">
              <DefaultSwiper
                slidesPerView={3}
                breakpoints={{ 768: { slidesPerView: 4 } }}
                on={{
                  slideChange: () => console.log("slide changed"),
                  progress: (s, progress) =>
                    console.log(`progress is ${progress}`),
                }}
              >
                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={Nier} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={Ori} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={Sekiro} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={EldenRing} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={Horizon} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={DeadCells} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={ForzaHorizon} />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-slide">
                    <a href="./Annunci.html">
                      <img alt="Game Cover" src={Stray} />
                    </a>
                  </div>
                </SwiperSlide>
              </DefaultSwiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;
