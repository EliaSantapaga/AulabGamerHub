import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

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
