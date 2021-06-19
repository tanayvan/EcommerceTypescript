import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

interface props {
  title: string;
  url: string;
}

const ProductCardHome: React.FC<props> = ({ url, title }) => {
  return (
    <Link to="/tshirt/all">
      <div className="card-container-wrap">
        <div className="card-image">
          <LazyLoadImage src={url} alt="" effect={"opacity"} />
        </div>
        <div className="card-header">{title}</div>
        <div className="next-icon">
          <i className="fas fa-long-arrow-alt-right"></i>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardHome;
