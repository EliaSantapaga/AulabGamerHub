import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameDetailLayout from "../layout/GameDetailLayout";

function GameDetail() {
  // const params = useParams();
  // console.log(params);

  //* Il params presente qui sopra è possibile destrutturarlo con ciò che ci serve, ovvero il game_slug
  const { game_slug } = useParams();
  console.log({ game_slug });

  const [game, setGame] = useState([]);

  useEffect(() => {
    async function getSingleGame() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${game_slug}?key=${
          import.meta.env.VITE_API_KEY
        }&page=1`
      );
      const json = await response.json();
      setGame(json);
    }
    getSingleGame();
  }, []);

  console.log(game);

  return (
    <GameDetailLayout>
      <div className="container my-5">
        <div className="row my-5">
          <div className="col-12 d-flex justify-content-center mt-5">
            <h1
              className="pb-2 border-bottom text-center text-white shadow-pink ff-orbitron mt-none mt-5"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {game.name}
            </h1>
          </div>
          <div className="row my-5">
            <div className="col-6">
              <img className="img-article" src={game.background_image} alt="" />
            </div>
            <div className="col-6 text-white">
              {game.description_raw}
            </div>
          </div>
        </div>
      </div>
    </GameDetailLayout>
  );
}

export default GameDetail;
