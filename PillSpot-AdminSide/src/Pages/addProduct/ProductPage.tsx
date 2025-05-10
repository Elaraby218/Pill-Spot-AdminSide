import { useProducts } from "../../hooks/useProducts";
import ProductForm from "./ProductFrom/ProductForm";
import ProductList from "./ProductList";


function AddMedcine() {
  const { products, addProduct, deleteProduct, editProduct, editingProduct } = useProducts();

  return (
    <div className="flex w-full">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="rounded-3xl p-4 md:p-6 bg-base-100">
          <h2 className="text-xl mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <ProductForm onSubmit={addProduct} editingProduct={editingProduct} />
        </div>
        
        <div className="bg-base-100 rounded-3xl p-4 md:p-6">
          <h2 className="text-xl mb-6">Product List</h2>
          <ProductList 
            products={products} 
            onDelete={deleteProduct} 
            onEdit={editProduct} 
          />
        </div>
      </div>
    </div>
  );
}

export default AddMedcine