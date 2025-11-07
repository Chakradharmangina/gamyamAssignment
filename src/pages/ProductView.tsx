import type { IProduct } from "../Interface/products";
import ProductListView from "./ProductListVew";
import { FaEdit } from 'react-icons/fa';

interface IProductView {
  products: IProduct[];
  isListView: boolean;
  onEditProduct: (product: IProduct) => void;
}

const ProductView: React.FC<IProductView> = ({ products, isListView, onEditProduct }) => {
  if (isListView) {
    return (
      <ProductListView products={products} onEdit={onEditProduct}/>
    );
  }

  return (
    <div className="product-cards">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="product-card-header">
            <div className="edit-active">
              <h3>{p.name}</h3>
              <button className="edit-btn" onClick={() => onEditProduct(p)}><FaEdit/></button>
            </div>
            <span className={`status-dot ${p.isActive ? "active" : "inactive"}`}></span>
          </div>

          <p className="category">{p.category}</p>

          <p className="description">{p.description}</p>

          <div className="price-stock">
            <span className="price">${p.price}</span>
            <span className="stock">Stock: {p.stock}</span>
          </div>

          <div className="tags">
            {p.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductView;
