import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

function GameDetailLayout({ children }) {
  return (
    <div className="container-fluid p-0">
      <AppNavbar />
      {children}
      <AppFooter />
    </div>
  );
}

export default GameDetailLayout;
