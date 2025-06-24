import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../axiosInstance';

export interface CosmeticProduct {
  productId: string;
  brand: string;
  skinType: string;
  volume: number;
  subCategoryId: string;
  name: string;
  description: string;
  price: number;
  usageInstructions: string;
  imageURL: string | null;
  subCategoryDto: {
    categoryDto: {
      categoryId: string;
      name: string;
    };
    subCategoryId: string;
    name: string;
  };
  manufacturer: string;
  createdDate: string;
}

export interface CosmeticProductFormData {
  brand: string;
  skinType: string;
  volume: number;
  subCategoryId: string;
  name: string;
  description: string;
  price: number;
  usageInstructions: string;
  image: FileList;
}

export const useCosmeticProducts = () => {
  const [products, setProducts] = useState<CosmeticProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCosmeticProducts = async () => {
    setLoading(true);
    try {
      // Assuming your API endpoint for cosmetics is /api/cosmetics
      const response = await axiosInstance.get('/api/cosmetics');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cosmetic products');
      toast.error('Failed to fetch cosmetic products');
      console.error('Error fetching cosmetic products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCosmeticProducts();
  }, []);

  const addCosmeticProduct = async (formData: CosmeticProductFormData) => {
    const data = new FormData();
    data.append('Brand', formData.brand);
    data.append('SkinType', formData.skinType);
    data.append('Volume', formData.volume.toString());
    data.append('SubCategoryId', formData.subCategoryId);
    data.append('Name', formData.name);
    data.append('Description', formData.description);
    data.append('Price', formData.price.toString());
    data.append('UsageInstructions', formData.usageInstructions);
    data.append('Manufacturer', formData.brand);

    if (formData.image && formData.image[0]) {
      data.append('Image', formData.image[0]);
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/cosmetics', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Cosmetic product added successfully!');
      // Assuming the response.data is the new product
      setProducts(prevProducts => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error submitting cosmetic product:', error);
      toast.error('Failed to add cosmetic product.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }
      await axiosInstance.delete(`/api/cosmetics/${id}`);
      setProducts(products.filter((p) => p.productId !== id));
      toast.success('Cosmetic deleted successfully!');
    } catch {
      toast.error('Failed to delete cosmetic.');
    }
  };

  const editProduct = (id: string) => {
    // For now, just log the ID.
    // In the future, you can set an "editing" state here
    // to open a modal with the product's data.
    console.log('Editing cosmetic with ID:', id);
  };

  return {
    products,
    loading,
    error,
    addCosmeticProduct,
    fetchCosmeticProducts,
    deleteProduct,
    editProduct,
  };
}; 