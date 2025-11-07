import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { IProduct } from '../Interface/products';
import { FaEdit } from 'react-icons/fa';

interface IProductListView {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
}

const ProductListView: React.FC<IProductListView> = ({ products, onEdit }) => {

  const statusBodyTemplate = (rowData: IProduct) => {
    return rowData.isActive ? <span style={{ color: 'green' }}>Active</span> : <span style={{color:'red'}}>Inactive</span>;
  };

  const tagsBodyTemplate = (rowData: IProduct) => {
    return rowData.tags.map((tag, idx) => (
      <span key={idx} style={{ marginRight: 4, background: '#f0f0f0', padding: '2px 6px', borderRadius: 4, fontSize: '0.8rem' }}>
        {tag}
      </span>
    ));
  };

  const editTemplate = (rowData: IProduct) => {
    return (
      <button
        className="edit-btn"
        onClick={() => onEdit(rowData)}
        title="Edit Product"
      >
        <FaEdit />
      </button>
    );
  };


  return (
    <div className="product-table-wrapper">
      <DataTable
        value={products}
        scrollable
        scrollHeight="600px"            
        emptyMessage="No products to display"
      >
        <Column field="name" header="Name" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="price" header="Price" body={ (row: IProduct) => `$${row.price}` } />
        <Column field="stock" header="Stock" />
        <Column header="Status" body={statusBodyTemplate} />
        <Column field="createdAt" header="Created Date" body={ (row: IProduct) => new Date(row.createdAt).toLocaleDateString() } />
        <Column header="Tags" body={tagsBodyTemplate} />
        <Column body={editTemplate} style={{ width: '60px', textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default ProductListView;
