import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

interface CosmeticProductFormData {
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
  const [editingProduct, setEditingProduct] = useState<CosmeticProduct | null>(null);

  const addProduct = (formData: CosmeticProductFormData) => {
    const file = formData.image?.[0];
    let imageUrl = null;
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        imageUrl = reader.result as string;
        
        if (editingProduct) {
          const updatedProduct = {
            ...editingProduct,
            brand: formData.brand,
            skinType: formData.skinType,
            volume: formData.volume,
            subCategoryId: formData.subCategoryId,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            usageInstructions: formData.usageInstructions,
            image: imageUrl
          };
          
          setProducts(prevProducts => 
            prevProducts.map(product => 
              product.id === editingProduct.id ? updatedProduct : product
            )
          );
        } else {
          const newProduct: CosmeticProduct = {
            id: uuidv4(),
            brand: formData.brand,
            skinType: formData.skinType,
            volume: formData.volume,
            subCategoryId: formData.subCategoryId,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            usageInstructions: formData.usageInstructions,
            image: imageUrl
          };
          
          setProducts(prevProducts => [...prevProducts, newProduct]);
        }
        setEditingProduct(null);
      };
    } else {
      if (editingProduct) {
        const updatedProduct = {
          ...editingProduct,
          brand: formData.brand,
          skinType: formData.skinType,
          volume: formData.volume,
          subCategoryId: formData.subCategoryId,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          usageInstructions: formData.usageInstructions
        };
        
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === editingProduct.id ? updatedProduct : product
          )
        );
      } else {
        const newProduct: CosmeticProduct = {
          id: uuidv4(),
          brand: formData.brand,
          skinType: formData.skinType,
          volume: formData.volume,
          subCategoryId: formData.subCategoryId,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          usageInstructions: formData.usageInstructions,
          image: null
        };
        
        setProducts(prevProducts => [...prevProducts, newProduct]);
      }
      setEditingProduct(null);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
  };

  const editProduct = (id: string) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  return {
    products,
    addProduct,
    deleteProduct,
    editProduct,
    editingProduct
  };
}; 