import { useSelector } from 'react-redux';
import ProductForm from "./ProductFrom/ProductForm";
import ProductList from "./ProductList";
import { RootState } from '../../App/Store';

function AddMedcine() {
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  return (
    <div className="flex w-full">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="rounded-3xl p-4 md:p-6 bg-base-100">
          <h2 className="text-xl mb-6">Add New Product</h2>
          <ProductForm onSubmit={() => {}} editingProduct={null} />
        </div>
        
        <div className="bg-base-100 rounded-3xl p-4 md:p-6">
          <h2 className="text-xl mb-6">Product List</h2>
          {loading ? (
            <div>Loading products...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <ProductList 
              products={products} 
              onDelete={() => {}} 
              onEdit={() => {}} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMedcine