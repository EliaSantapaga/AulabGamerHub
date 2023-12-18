function GameInfo({ game }) {
  console.log(game);

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div class="col-12 custom-box text-white rounded mb-3">
            <div class="custom-text shadow-neon">Developers</div>
            <div>
              {game.developers.map((developer) => developer.name).join(', ')}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div class="col-12 custom-box text-white rounded mb-3">
            <div class="custom-text shadow-neon">Publishers</div>
            <div>
              {game.publishers.map((publisher) => publisher.name).join(', ')}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 custom-box text-white rounded mb-3">
        <div class="custom-text shadow-neon">Genres</div>
        <div>{game.genres.map((genre) => genre.name).join(', ')}</div>
      </div>

      <div class="col-12 custom-box text-white rounded mb-3">
        <div class="custom-text shadow-neon">Platforms</div>
        <div>
          {game.platforms.map((platform) => platform.platform.name).join(', ')}
        </div>
      </div>

      <div class="col-12 custom-box text-white rounded mb-3">
        <div class="custom-text shadow-neon">Stores</div>
        <div>{game.stores.map((store) => store.store.name).join(', ')}</div>
      </div>
    </div>
  );
}

export default GameInfo;
