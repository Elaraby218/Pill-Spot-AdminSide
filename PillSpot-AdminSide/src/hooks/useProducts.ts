import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Product {
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

interface ProductFormData {
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

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const addProduct = (formData: ProductFormData) => {
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
            name: formData.name,
            category: formData.category,
            description: formData.description,
            dosage: formData.dosage,
            price: formData.price,
            manufacturer: formData.manufacturer,
            sideEffects: formData.sideEffects,
            requiresPrescription: formData.requiresPrescription,
            image: imageUrl
          };
          
          setProducts(prevProducts => 
            prevProducts.map(product => 
              product.id === editingProduct.id ? updatedProduct : product
            )
          );
        } else {
          const newProduct: Product = {
            id: uuidv4(),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            dosage: formData.dosage,
            price: formData.price,
            manufacturer: formData.manufacturer,
            sideEffects: formData.sideEffects,
            requiresPrescription: formData.requiresPrescription,
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
          name: formData.name,
          category: formData.category,
          description: formData.description,
          dosage: formData.dosage,
          price: formData.price,
          manufacturer: formData.manufacturer,
          sideEffects: formData.sideEffects,
          requiresPrescription: formData.requiresPrescription
        };
        
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === editingProduct.id ? updatedProduct : product
          )
        );
      } else {
        const newProduct: Product = {
          id: uuidv4(),
          name: formData.name,
          category: formData.category,
          description: formData.description,
          dosage: formData.dosage,
          price: formData.price,
          manufacturer: formData.manufacturer,
          sideEffects: formData.sideEffects,
          requiresPrescription: formData.requiresPrescription,
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