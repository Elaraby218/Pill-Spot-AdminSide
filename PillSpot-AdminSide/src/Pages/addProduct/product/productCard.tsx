import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import EditProductModal from "./EditProductModal";

interface Product {
  productId: string;
  name: string;
  manufacturer: string;
  dosage: number;
  sideEffects: string;
  isPrescriptionRequired: boolean;
  subCategoryDto: {
    categoryDto: {
      categoryId: string;
      name: string;
    };
    subCategoryId: string;
    name: string;
  };
  description: string;
  usageInstructions: string;
  price: number;
  imageURL: string;
  createdDate: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  refreshProducts: () => void;
}

const ProductCard = ({ product, onDelete, onEdit, refreshProducts }: ProductCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSave = (data: {
    name: string;
    category: string;
    subCategory: string;
    description: string;
    dosage: string;
    price: string;
    manufacturer: string;
    sideEffects: string;
    usageInstructions: string;
    requiresPrescription: boolean;
    image: FileList;
  }) => {
    // Handle the edit save - you can call your API here
    console.log('Saving edited product:', data);
    onEdit(product.productId);
    setIsEditModalOpen(false);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="group relative bg-[#2C3745] dark:bg-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-400">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
            {product.imageURL ? (
              <img
                src={import.meta.env.VITE_API_BASE_URL+product.imageURL}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Name and Price Column */}
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold text-white dark:text-gray-800">{product.name}</h3>
            <p className="text-lg font-medium text-blue-400">${product.price.toFixed(2)}</p>
          </div>

          {/* Instructions and Dosage Column */}
          <div className="flex-1 space-y-1">
            <p className="text-sm text-gray-300 dark:text-gray-600">
              <span className="font-medium">Dosage:</span> {product.dosage}
            </p>
            <p className="text-sm text-gray-300 dark:text-gray-600">
              <span className="font-medium">Manufacturer:</span> {product.manufacturer}
            </p>
            {product.isPrescriptionRequired && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-400 bg-red-400/10 rounded-full">
                Requires Prescription
              </span>
            )}
          </div>

          {/* Action Buttons Column */}
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
              aria-label="Edit product"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(product.productId)}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              aria-label="Delete product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <EditProductModal
        product={product}
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
        refreshProducts={refreshProducts}
      />
    </>
  );
};

export default ProductCard;
