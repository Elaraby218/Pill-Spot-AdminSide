import { useCosmeticProducts } from "../../hooks/useCosmeticProducts";
import CosmeticForm from "./CosmeticForm/CosmeticForm";
import CosmeticList from "./CosmeticList";

function CosmeticPage() {
  const { products, addCosmeticProduct, loading, error, deleteProduct, editProduct, fetchCosmeticProducts } = useCosmeticProducts();

  return (
    <div className="flex w-full">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="rounded-3xl p-4 md:p-6 bg-base-100">
          <h2 className="text-xl mb-6">Add New Cosmetic Product</h2>
          <CosmeticForm 
            onSubmit={addCosmeticProduct} 
            isLoading={loading}
          />
        </div>

        <div className="bg-base-100 rounded-3xl p-4 md:p-6">
          <h2 className="text-xl mb-6">Cosmetic Products List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <CosmeticList 
              products={products}
              onDelete={deleteProduct}
              onEdit={editProduct}
              refreshCosmetics={fetchCosmeticProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CosmeticPage; 