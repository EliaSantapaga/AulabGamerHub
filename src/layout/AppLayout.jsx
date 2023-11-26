import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

function AppLayout({
  children,
  admin,
  setAdmin,
  game,
  setGame,
  gameSearched,
  setGameSearched,
}) {
  return (
    <div className="container-fluid p-0 app-body">
      <AppNavbar
        admin={admin}
        setAdmin={setAdmin}
        game={game}
        setGame={setGame}
        gameSearched={gameSearched}
        setGameSearched={setGameSearched}
      />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppLayout;
