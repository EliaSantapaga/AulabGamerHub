import Decoration from '../../assets/Elden-Ring-Leaf-decoration.png';
import style from './LeafDecoration.module.css';

function LeafDecoration() {
  return (
    <div className="row center-flex m-0">
      <div className="col-12 col-md-7 overflow-hidden">
        <img className="leaf-decoration" src={Decoration} alt="Decoration" />
      </div>
    </div>
  );
}

export default LeafDecoration;
