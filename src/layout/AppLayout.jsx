import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

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
