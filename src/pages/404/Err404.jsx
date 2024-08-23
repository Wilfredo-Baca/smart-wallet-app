import svg404 from '../../assets/404.svg';
import { Link } from 'react-router-dom';
import "../../styles/Err404.css";
const Error404 = () => {
  return (
    <div className="container-404">
      <img src={svg404} alt="Error 404" />
      <h1 className="title-404">Página no encontrada</h1>
      <p className="text-404">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/metas" className="button-404">Regresar al inicio</Link>
    </div>
  );
}

export default Error404;