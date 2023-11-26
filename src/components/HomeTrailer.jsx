function HomeTrailer() {
  return (
    <section
      className="container-fluid trailer"
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="row">
        <div className="col-12 col-lg-7 trailer-col d-flex align-items-end justify-content-center p-3">
          <div
            className="feature game-card trailer-card d-flex align-items-center justify-content-between flex-column"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="video-trailer">
              <iframe
                src="https://www.youtube.com/embed/uMR0kw09n2A?controls=0&amp;start=25&loop=1&autoplay=1&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-trailer"></div>

            <h3 className="text-center px-2 ff-orbitron shadow-pink text-trailer">
              Oltre
              <span className="ff-orbitron neon mx-3" id="games-number">
                200
              </span>
              videogiochi <br /> disponibili...
            </h3>

            <h3 className="text-center px-4 ff-orbitron shadow-pink  text-trailer">
              ...e moltissimi altri in arrivo!
            </h3>

            <a href="./Annunci.html">
              <button className="ff-orbitron text-uppercase cardbutton trailer-button my-4">
                Scopri di più
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTrailer;
