import { useCosmeticProducts } from "../../hooks/useCosmeticProducts";
import CosmeticForm from "./CosmeticForm/CosmeticForm";
import CosmeticList from "./CosmeticList";

function CosmeticPage() {
  const { products, addProduct, deleteProduct, editProduct, editingProduct } = useCosmeticProducts();

  return (
    <div className="flex w-full">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="rounded-3xl p-4 md:p-6 bg-base-100">
          <h2 className="text-xl mb-6">{editingProduct ? 'Edit Cosmetic Product' : 'Add New Cosmetic Product'}</h2>
          <CosmeticForm onSubmit={addProduct} editingProduct={editingProduct} />
        </div>
        
        <div className="bg-base-100 rounded-3xl p-4 md:p-6">
          <h2 className="text-xl mb-6">Cosmetic Products List</h2>
          <CosmeticList 
            products={products} 
            onDelete={deleteProduct} 
            onEdit={editProduct} 
          />
        </div>
      </div>
    </div>
  );
}

export default CosmeticPage; 