import { useEffect, useState } from 'react';
import ProductForm from "./ProductFrom/ProductForm";
import ProductList, { Product } from "./ProductList";
import { ProductFormData } from "./ProductFrom/types";
import axiosInstance from '../../axiosInstance';
import { toast } from 'sonner';

function AddMedcine() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  console.log(editingProduct);

  const fetchProducts = async () => {
    try {
      const productsRes = await axiosInstance.get('/api/medicines');
      setProducts(productsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id: string) => {
    const product = products.find(p => p.productId === id);
    if (product) {
      console.log(product)
      setEditingProduct(product);
    }
  };

  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      // Make API call to delete the product
      await axiosInstance.delete(`/api/medicines/${id}`);
      
      // Show success message
      toast.success('Product deleted successfully!');
      
      // Refresh the products list
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  const handleFormSubmit = async (formData: ProductFormData) => {
    if (editingProduct) {
      // Handle edit submission
      console.log('Edit product:', editingProduct.productId, formData);
      try {
        // Here you would call your edit API
        toast.success('Product updated successfully!');
        setEditingProduct(null); // Clear editing state after submission
        await fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    } else {
      // Handle add submission
      console.log('Add product:', formData);
      try {
        // Here you would call your add API
        toast.success('Product added successfully!');
        await fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      }
    }
  };

  return (
    <div className="flex w-full">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="rounded-3xl p-4 md:p-6 bg-base-100">
          <h2 className="text-xl mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <ProductForm
            onSubmit={handleFormSubmit}
            refreshProducts={fetchProducts}
          />
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
              onDelete={handleDelete}
              onEdit={handleEdit}
              refreshProducts={fetchProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMedcine