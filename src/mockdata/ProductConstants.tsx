export const productFormSchema = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'price', label: 'Price', type: 'number', required: true, min: 0 },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'stock', label: 'Stock', type: 'number', required: true, min: 0 },
    { key: 'description', label: 'Description', type: 'text', required: false },
  ];

export const initialFormData = {
  id: 0,
  name: '',
  price: 0,
  category: '',
  stock: 0,
  description: '',
  createdAt: new Date().toISOString(),
  isActive: true,
  tags: [],
}