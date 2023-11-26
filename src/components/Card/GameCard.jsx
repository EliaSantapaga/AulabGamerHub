import "./card.css";

function GameCard() {
  return (
    <div className="col-3">
      <div className="wrapper">
        <div className="card">
          <img src="https://picsum.photos/200/300" />
          <div className="descriptions">
            <h1>Titolo Gioco</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
              natus eligendi quas ad eos dolores quia perferendis itaque magni
              recusandae dolore animi, molestiae, ullam ducimus sed. Dolores sed
              voluptates similique?
            </p>
            <button>
              <i className="fab fa-youtube"></i>
              Play trailer on YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
