import Decoration from '../../assets/Elden-Ring-Leaf-decoration.png';
import style from './LeafDecoration.module.css';

function LeafDecoration() {
  return (
    <div className="row center-flex">
      <div className="col-12 col-md-7">
        <img
          className={style.leafDecoration}
          src={Decoration}
          alt="Decoration"
        />
      </div>
    </div>
  );
}

export default LeafDecoration;
