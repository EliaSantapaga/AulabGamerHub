import PlayStation from "../assets/PlayStation-Plus.png";
import Xbox from "../assets/Xbox Game Pass.png";
import Nintendo from "../assets/Nintendo Switch Online.png";

function HomeCards() {
  return (
    <section className="container px-4 py-5" id="featured-3">
      <h2
        className="pb-2 border-bottom text-center text-white shadow-pink ff-orbitron"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-anchor-placement="center-bottom"
      >
        Servizi per ogni console!
      </h2>

      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="col-12 col-lg-4 cardContainer">
          <div
            className="feature game-card d-flex align-items-center justify-content-between flex-column"
            data-aos="flip-left"
            data-aos-delay="100"
            data-aos-duration="1100"
          >
            <img
              src={PlayStation}
              alt="PlayStation Plus"
              className="img-fluid img-card"
            />

            <h3 className="text-white text-center px-4">
              Ecco il nuovo PlayStation®Plus
            </h3>

            <p className="text-white text-center px-4">
              Libera il potere di PlayStation e scopri il tuo nuovo gioco
              preferito con una nuova selezione di piani di abbonamento.
            </p>

            <a
              target="_blank"
              href="https://www.playstation.com/it-it/ps-plus/?emcid=pa-co-445764&gclid=Cj0KCQjwr4eYBhDrARIsANPywChaApCAlP8rNuTVhVlIf9HmA9VHdn6S9SFKNvwhaBRsZy1kOmjexNUaAhjdEALw_wcB&gclsrc=aw.ds"
              rel="noreferrer"
            >
              <button className="ff-orbitron text-uppercase cardbutton playstationbutton my-4 mx-1">
                Vai al sito
              </button>
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="feature game-card d-flex align-items-center justify-content-between flex-column xbox-game-card"
            data-aos="flip-left"
            data-aos-delay="200"
            data-aos-duration="1100"
          >
            <img
              src={Xbox}
              alt="Xbox Game Pass"
              className="img-fluid img-card"
            />

            <h3 className="text-white text-center px-4">
              Ecco il nuovo <br /> Xbox Game Pass
            </h3>

            <p className="text-white text-center px-4">
              Gioca ai nuovi titoli il giorno del lancio. In più, gioca con gli
              amici a centinaia di titoli di grande qualità su console, PC o
              cloud.{" "}
            </p>

            <a
              target="_blank"
              href="https://www.xbox.com/it-IT/xbox-game-pass"
              rel="noreferrer"
            >
              <button className="ff-orbitron text-uppercase cardbutton xboxbutton my-4">
                Vai al sito
              </button>
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="feature game-card switch-game-card d-flex align-items-center justify-content-between flex-column"
            data-aos="flip-left"
            data-aos-delay="300"
            data-aos-duration="1100"
          >
            <img
              src={Nintendo}
              alt="Nintendo Switch Online"
              className="img-fluid img-card"
            />

            <h3 className="text-white text-center px-4">
              Ecco il nuovo <br /> Nintendo Switch Online
            </h3>

            <p className="text-white text-center px-4">
              Goditi la tua esperienza su Nintendo Switch con il gioco online,
              il cloud, un catalogo di giochi classNameici e altro ancora!
            </p>

            <a
              target="_blank"
              href="https://www.nintendo.it/Nintendo-Switch-Online/Nintendo-Switch-Online-1183143.html"
              rel="noreferrer"
            >
              <button className="ff-orbitron text-uppercase cardbutton switchbutton my-4">
                Vai al sito
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCards;
