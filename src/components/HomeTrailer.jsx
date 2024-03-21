import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomeTrailer() {
  const [count, setCount] = useState(300);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount + 1;

        // Se raggiunge 800, interrompi l'auto-incremento
        if (newCount === 800) {
          clearInterval(intervalId);
        }

        return newCount;
      });
    }, 5); // Intervallo in millisecondi, puoi regolarlo a tuo piacimento

    // Pulisci l'intervallo quando il componente viene smontato o quando count raggiunge 800
    return () => clearInterval(intervalId);
  }, []);

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
            className="feature text-light  trailer-card box-shadow-gold rounded d-flex align-items-center justify-content-between flex-column"
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
                className="rounded"
              />
            </div>

            <div>
              <h4 className="text-center px-2 ff-cinzel text-trailer fs-3">
                More than
                <span className="ff-cinzel neon mx-3" id="games-number">
                  {count}k
                </span>
                <br /> videogames available...
                <br /> ...and many others
                <br /> coming soon!
              </h4>

              <h4 className="text-center px-4 ff-cinzel text-trailer fs-3"></h4>
            </div>

            <button className="ff-cinzel game-list-button my-4">
              <Link
                className="text-decoration-none nav-link text-white"
                to="/games"
              >
                Show more
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTrailer;
