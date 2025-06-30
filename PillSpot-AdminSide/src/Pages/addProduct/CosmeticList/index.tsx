import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { CosmeticProduct } from '../../../hooks/useCosmeticProducts';
import CosmeticCard from '../cosmetic/CosmeticCard';

interface CosmeticListProps {
  products: CosmeticProduct[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  refreshCosmetics: () => void;
}

const CosmeticList = ({ products, onDelete, refreshCosmetics }: CosmeticListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const searchLower = searchTerm.toLowerCase().trim();
    return products.filter(product => {
      const name = String(product.name || '').toLowerCase();
      const brand = String(product.brand || '').toLowerCase();
      const skinType = String(product.skinType || '').toLowerCase();

      return name.includes(searchLower) ||
             brand.includes(searchLower) ||
             skinType.includes(searchLower);
    });
  }, [products, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, brand, or skin type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border bg-[#2C3745] dark:bg-gray-300 border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-4 mt-4 h-[calc(80vh-10rem)] overflow-y-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <CosmeticCard
              key={product.productId}
              product={product}
              onDelete={onDelete}
              refreshCosmetics={refreshCosmetics}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'No cosmetics match your search' : 'No cosmetics added yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmeticList; 