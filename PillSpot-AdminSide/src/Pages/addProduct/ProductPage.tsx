import { useEffect, useState } from 'react';
import ProductForm from "./ProductFrom/ProductForm";
import ProductList from "./ProductList";
import axiosInstance from '../../axiosInstance';

function AddMedcine() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/medicines?PageSize=100000');
        setProducts(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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