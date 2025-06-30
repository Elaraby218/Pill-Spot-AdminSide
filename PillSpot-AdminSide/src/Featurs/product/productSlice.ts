import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

interface Product {
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

interface ProductFormData {
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

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      

      formData.append('name', productData.name);
      formData.append('category', productData.category);
      formData.append('subCategoryId', productData.subCategory);
      formData.append('description', productData.description);
      formData.append('dosage', productData.dosage);
      formData.append('price', productData.price);
      formData.append('manufacturer', productData.manufacturer);
      formData.append('sideEffects', productData.sideEffects);
      formData.append('usageInstructions', productData.usageInstructions);
      formData.append('isPrescriptionRequired', String(productData.requiresPrescription));
      

      if (productData.image && productData.image[0]) {
        formData.append('image', productData.image[0]);
      }

      const response = await axiosInstance.post('/api/medicines', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch {
      return rejectWithValue('Failed to add product');
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/medicines');
      return response.data;
    } catch  {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer; 