export interface Category {
  Id: string;
  name: string;
  categoryId: string;
}

export interface SubCategory {
  subCategoryId: string;
  name: string;
}

export interface Product {
  id: string;
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
  image: string | null;
}

export interface ProductFormData {
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
}

export interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  editingProduct: Product | null;
  onCancel?: () => void;
  refreshProducts?: () => void;
} 