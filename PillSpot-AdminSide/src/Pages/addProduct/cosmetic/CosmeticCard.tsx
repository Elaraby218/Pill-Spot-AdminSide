import { Edit, Trash2 } from "lucide-react";

interface CosmeticProduct {
  id: string;
  brand: string;
  skinType: string;
  volume: number;
  subCategoryId: string;
  name: string;
  description: string;
  price: number;
  usageInstructions: string;
  image: string | null;
}

interface CosmeticCardProps {
  product: CosmeticProduct;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CosmeticCard = ({ product, onDelete, onEdit }: CosmeticCardProps) => {
  return (
    <div className="border border-gray-600 rounded-lg p-4 transition-all duration-300 hover:border-gray-400 bg-[#2C3745] dark:bg-gray-300">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              image
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-around">
          <div>
            <div className="text-2xl">{product.name}</div>
            <div className="text-md text-gray-400 dark:text-gray-600">{product.brand}</div>
            <div className="text-md text-gray-400 dark:text-gray-600">${product.price}</div>
          </div>
          <div>
            <div className="text-md text-gray-400 dark:text-gray-600">{product.skinType}</div>
            <div className="text-md text-gray-400 dark:text-gray-600">{product.volume}ml</div>
            <div className="text-md text-gray-400 dark:text-gray-600">SubCat: {product.subCategoryId}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 border border-gray-600 rounded-lg hover:border-red-400 transition-colors"
            aria-label="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(product.id)}
            className="p-2 border border-gray-600 rounded-lg hover:border-blue-400 transition-colors"
            aria-label="Edit product"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CosmeticCard; 