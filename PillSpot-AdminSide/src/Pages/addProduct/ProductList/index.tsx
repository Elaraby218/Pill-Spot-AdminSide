import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../product/productCard';



export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    dosage: string;
    price: string;
    manufacturer: string;
    sideEffects: string;
    requiresPrescription: boolean;
    image: string | null;
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
  }

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ProductList = ({ products, onDelete, onEdit }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border bg-[#2C3745] dark:bg-gray-300 border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
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