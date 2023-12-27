import PlayStation from '../assets/PlayStation-Plus - Trasparente.png';
import Xbox from '../assets/Xbox Game Pass - Trasparente.png';
import Nintendo from '../assets/Nintendo Switch Online - Trasparente.png';
import LeafDecoration from './Decorations/LeafDecoration';

function HomeCards() {
  return (
    <section className="container px-4 py-5" id="featured-3">
      <h2
        className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-anchor-placement="center-bottom"
      >
        Services for every console!
      </h2>

      <LeafDecoration />

      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="col-12 col-lg-4 home-card-container">
          <div
            className="feature box-shadow-playstation rounded game-card playstation-game-card d-flex align-items-center justify-content-between flex-column"
            data-aos="flip-left"
            data-aos-delay="100"
            data-aos-duration="1100"
          >
            <img
              src={PlayStation}
              alt="PlayStation Plus"
              className="img-fluid img-card"
            />

            <h4 className="text-white text-center px-4 ">
              Here's the new <br /> PlayStation®Plus
            </h4>

            <p className="text-white text-center px-4 mt-3">
              Unleash the full potential of PlayStation and discover your new
              favorite game with our selection of subscription plans.
            </p>

            <a
              target="_blank"
              href="https://www.playstation.com/it-it/ps-plus/?emcid=pa-co-445764&gclid=Cj0KCQjwr4eYBhDrARIsANPywChaApCAlP8rNuTVhVlIf9HmA9VHdn6S9SFKNvwhaBRsZy1kOmjexNUaAhjdEALw_wcB&gclsrc=aw.ds"
              rel="noreferrer"
            >
              <button className="ff-cinzel game-list-button playstationbutton my-4 mx-1">
                Visit website
              </button>
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="feature box-shadow-xbox rounded game-card xbox-game-card d-flex align-items-center justify-content-between flex-column"
            data-aos="flip-left"
            data-aos-delay="200"
            data-aos-duration="1100"
          >
            <img
              src={Xbox}
              alt="Xbox Game Pass"
              className="img-fluid img-card"
            />

            <h4 className="text-white text-center px-4">
              Here's the new <br /> Xbox Game Pass
            </h4>

            <p className="text-white text-center px-4 mt-3">
              Play new games on launch day. In addition, play hundreds of
              high-quality games with friends on console, pc or cloud gaming.
            </p>

            <a
              target="_blank"
              href="https://www.xbox.com/it-IT/xbox-game-pass"
              rel="noreferrer"
            >
              <button className="ff-cinzel game-list-button playstationbutton my-4 mx-1">
                Visit website
              </button>
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="feature box-shadow-nintendo rounded game-card nintendo-game-card d-flex align-items-center justify-content-between flex-column"
            data-aos="flip-left"
            data-aos-delay="300"
            data-aos-duration="1100"
          >
            <img
              src={Nintendo}
              alt="Nintendo Switch Online"
              className="img-fluid img-card"
            />

            <h4 className="text-white text-center px-4">
              Here's the new <br /> Nintendo Switch Online
            </h4>

            <p className="text-white text-center px-4 mt-3">
              Enjoy your Nintendo Switch experience with online play, cloud
              gaming, a huge catalog of classic games and so much more!
            </p>

            <a
              target="_blank"
              href="https://www.nintendo.it/Nintendo-Switch-Online/Nintendo-Switch-Online-1183143.html"
              rel="noreferrer"
            >
              <button className="ff-cinzel game-list-button playstationbutton my-4 mx-1">
                Visit website
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCards;
