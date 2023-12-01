import style from "./sidebar.module.css";

function Sidebar() {
  return (
    <div>
      <div class="sidebar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
}

export default Sidebar;
