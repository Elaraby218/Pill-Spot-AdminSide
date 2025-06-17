import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../product/productCard';

export interface Product {
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

export interface ProductFormData {
    name: string;
    category: string;
    description: string;
    dosage: string;
    price: string;
    manufacturer: string;
    sideEffects: string;
    requiresPrescription: boolean;
    image: FileList;
    imageURL: string | null;
  }

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  refreshProducts: () => void;
}

const ProductList = ({ products, onDelete, onEdit, refreshProducts }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const searchLower = searchTerm.toLowerCase().trim();
    return products.filter(product => {
      const name = String(product.name || '').toLowerCase();
      const manufacturer = String(product.manufacturer || '').toLowerCase();
      const dosage = String(product.dosage || '').toLowerCase();
      const price = String(product.price || '').toLowerCase();
      const category = String(product.subCategoryDto?.categoryDto?.name || '').toLowerCase();

      return name.includes(searchLower) ||
             manufacturer.includes(searchLower) ||
             dosage.includes(searchLower) ||
             price.includes(searchLower) ||
             category.includes(searchLower);
    });
  }, [products, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, manufacturer, dosage, or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border bg-[#2C3745] dark:bg-gray-300 border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-4 mt-4 h-[calc(80vh-10rem)] overflow-y-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.productId}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
              refreshProducts={refreshProducts}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'No products match your search' : 'No products added yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;