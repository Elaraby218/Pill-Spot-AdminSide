import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { X } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'sonner';

interface Category {
    categoryId: string;
    name: string;
}

interface SubCategory {
    subCategoryId: string;
    name: string;
    categoryDto: Category;
}

interface Product {
    productId: string;
    name: string;
    manufacturer: string;
    dosage: number;
    sideEffects: string;
    isPrescriptionRequired: boolean;
    subCategoryDto: SubCategory;
    description: string;
    usageInstructions: string;
    price: number;
    imageURL: string;
    createdDate: string;
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

interface EditProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ProductFormData) => void;
    refreshProducts: () => void;
}

const EditProductModal = ({ product, isOpen, onClose, onSave, refreshProducts }: EditProductModalProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [subCategorySearchTerm, setSubCategorySearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<ProductFormData>();

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/api/categories?PageNumber=1&PageSize=10000');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (selectedCategoryId) {
                setIsLoadingSubCategories(true);
                try {
                    const response = await axiosInstance.get(`/api/categories/${selectedCategoryId}/subcategories`);
                    setSubCategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                    setSubCategories([]);
                } finally {
                    setIsLoadingSubCategories(false);
                }
            } else {
                setSubCategories([]);
            }
        };
        fetchSubCategories();
    }, [selectedCategoryId]);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSubCategories = subCategories.filter(subCategory =>
        subCategory.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase())
    );

    const handleCategorySelect = (category: Category) => {
        setValue('category', category.name);
        setSearchTerm(category.name);
        setShowDropdown(false);
        setSelectedCategoryId(category.categoryId);
        setValue('subCategory', '');
        setSubCategorySearchTerm('');
        setShowSubCategoryDropdown(true);
    };

    const handleSubCategorySelect = (subCategory: SubCategory) => {
        setValue('subCategory', subCategory.subCategoryId);
        setSubCategorySearchTerm(subCategory.name);
        setShowSubCategoryDropdown(false);
    };

    useEffect(() => {
        if (product && isOpen) {
            setValue('name', product.name);
            setValue('category', product.subCategoryDto.categoryDto.name);
            setValue('subCategory', product.subCategoryDto.subCategoryId);
            setValue('description', product.description);
            setValue('dosage', product.dosage.toString());
            setValue('price', product.price.toString());
            setValue('manufacturer', product.manufacturer);
            setValue('sideEffects', product.sideEffects || '');
            setValue('usageInstructions', product.usageInstructions);
            setValue('requiresPrescription', product.isPrescriptionRequired);
            setPreview(product.imageURL ? `https://localhost:7298${product.imageURL}` : null);
            setSearchTerm(product.subCategoryDto.categoryDto.name);
            setSubCategorySearchTerm(product.subCategoryDto.name);
            setSelectedCategoryId(product.subCategoryDto.categoryDto.categoryId);
        } else {
            reset();
            setPreview(null);
            setSearchTerm('');
            setSubCategorySearchTerm('');
        }
    }, [product, isOpen, setValue, reset]);

    const handleFormSubmit: SubmitHandler<ProductFormData> = async (data) => {
        const transformedData: ProductFormData = {
            ...data,
            price: parseFloat(data.price).toFixed(2),
            requiresPrescription: Boolean(data.requiresPrescription),
            image: data.image,
        };

        try {
            if (product) {
                // Create FormData object
                const formData = new FormData();
                
                // Add all the form fields to FormData
                formData.append('Name', transformedData.name);
                formData.append('Manufacturer', transformedData.manufacturer);
                formData.append('Dosage', transformedData.dosage);
                formData.append('SideEffects', transformedData.sideEffects);
                formData.append('IsPrescriptionRequired', transformedData.requiresPrescription.toString());
                formData.append('SubCategoryId', transformedData.subCategory);
                formData.append('Description', transformedData.description);
                formData.append('UsageInstructions', transformedData.usageInstructions);
                formData.append('Price', transformedData.price);
                
                // Add image file if selected
                if (data.image && data.image[0]) {
                    formData.append('Image', data.image[0]);
                }

                // Make actual API call to edit product with FormData
                await axiosInstance.patch(`/api/medicines/${product.productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                toast.success('Product updated successfully!');
                refreshProducts();
                onSave(transformedData);
                onClose();
            }
        } catch (error: unknown) {
            console.error('Error updating product:', error);
            
            // Handle different types of errors
            const axiosError = error as { response?: { status?: number }, message?: string };
            
            if (axiosError.response?.status === 400) {
                toast.error('Invalid data provided. Please check your input.');
            } else if (axiosError.response?.status === 404) {
                toast.error('Product not found.');
            } else if (axiosError.response?.status === 500) {
                toast.error('Server error. Please try again later.');
            } else if (axiosError.message === 'Network Error') {
                toast.error('Network error. Please check your connection.');
            } else {
                toast.error('Failed to update product. Please try again.');
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-[#2C3745] dark:bg-gray-300 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-600/50">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-600/50">
                    <h2 className="text-2xl font-bold text-white dark:text-gray-800">
                        Edit Product
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-600/50 dark:hover:bg-gray-400/50 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="space-y-6">
                        {/* Basic Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        {...register('name', { required: 'Product name is required' })}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                        Price *
                                    </label>
                                    <input
                                        {...register('price', { 
                                            required: 'Price is required',
                                            pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' }
                                        })}
                                        type="number"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-400">{errors.price.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                        Dosage *
                                    </label>
                                    <input
                                        {...register('dosage', { required: 'Dosage is required' })}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                        placeholder="e.g., 500mg"
                                    />
                                    {errors.dosage && (
                                        <p className="mt-1 text-sm text-red-400">{errors.dosage.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                        Manufacturer *
                                    </label>
                                    <input
                                        {...register('manufacturer', { required: 'Manufacturer is required' })}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                        placeholder="Enter manufacturer name"
                                    />
                                    {errors.manufacturer && (
                                        <p className="mt-1 text-sm text-red-400">{errors.manufacturer.message}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                    Product Image
                                </label>
                                <div className="relative border border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 focus-within:border-white">
                                    <input
                                        {...register('image')}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    {preview ? (
                                        <div className="w-full h-48 relative">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-fill"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white">Change image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 flex flex-col items-center justify-center p-4 bg-[#2C3745] dark:bg-gray-300">
                                            <div className="w-8 h-8 mb-2 text-gray-400">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400">Upload new image</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                    placeholder="Search categories..."
                                />
                                {showDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-[#2C3745] dark:bg-gray-300 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                                        {isLoading ? (
                                            <div className="p-3 text-center text-gray-400">Loading...</div>
                                        ) : filteredCategories.length > 0 ? (
                                            filteredCategories.map((category) => (
                                                <button
                                                    key={category.categoryId}
                                                    type="button"
                                                    onClick={() => handleCategorySelect(category)}
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-800"
                                                >
                                                    {category.name}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-3 text-center text-gray-400">No categories found</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                    Sub Category *
                                </label>
                                <input
                                    type="text"
                                    value={subCategorySearchTerm}
                                    onChange={(e) => setSubCategorySearchTerm(e.target.value)}
                                    onFocus={() => setShowSubCategoryDropdown(true)}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                    placeholder="Search sub categories..."
                                    disabled={!selectedCategoryId}
                                />
                                {showSubCategoryDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-[#2C3745] dark:bg-gray-300 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                                        {isLoadingSubCategories ? (
                                            <div className="p-3 text-center text-gray-400">Loading...</div>
                                        ) : filteredSubCategories.length > 0 ? (
                                            filteredSubCategories.map((subCategory) => (
                                                <button
                                                    key={subCategory.subCategoryId}
                                                    type="button"
                                                    onClick={() => handleSubCategorySelect(subCategory)}
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-800"
                                                >
                                                    {subCategory.name}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-3 text-center text-gray-400">No sub categories found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                Description *
                            </label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                placeholder="Enter product description"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Usage Instructions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                Usage Instructions *
                            </label>
                            <textarea
                                {...register('usageInstructions', { required: 'Usage instructions are required' })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                placeholder="Enter usage instructions"
                            />
                            {errors.usageInstructions && (
                                <p className="mt-1 text-sm text-red-400">{errors.usageInstructions.message}</p>
                            )}
                        </div>

                        {/* Side Effects */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-600 mb-2">
                                Side Effects
                            </label>
                            <textarea
                                {...register('sideEffects')}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#2C3745] dark:bg-gray-300 text-white dark:text-gray-800"
                                placeholder="Enter side effects (optional)"
                            />
                        </div>

                        {/* Requires Prescription */}
                        <div className="flex items-center">
                            <input
                                {...register('requiresPrescription')}
                                type="checkbox"
                                id="requiresPrescription"
                                className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded"
                            />
                            <label htmlFor="requiresPrescription" className="ml-2 block text-sm text-gray-300 dark:text-gray-600">
                                Requires Prescription
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-600/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 dark:text-gray-600 hover:bg-gray-600/50 dark:hover:bg-gray-400/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal; 