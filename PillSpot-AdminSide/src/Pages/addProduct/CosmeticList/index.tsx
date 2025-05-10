import { useState } from 'react';
import { Search } from 'lucide-react';
import CosmeticCard from '../cosmetic/CosmeticCard';

export interface CosmeticProduct {
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

interface CosmeticListProps {
  products: CosmeticProduct[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CosmeticList = ({ products, onDelete, onEdit }: CosmeticListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.skinType.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CosmeticCard
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

export default CosmeticList; 