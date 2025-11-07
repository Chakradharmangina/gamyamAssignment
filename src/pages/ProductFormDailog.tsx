/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FC } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import type { IProduct } from '../Interface/products';
import { initialFormData, productFormSchema } from '../mockdata/ProductConstants';

interface ProductFormDialogProps {
  visible: boolean;
  product?: IProduct | null;
  onHide: () => void;
  onSave: (product: IProduct) => void;
  currentProducts: IProduct[];
}
  

const ProductFormDialog: FC<ProductFormDialogProps> = ({
  visible,
  product,
  onHide,
  onSave,
  currentProducts,
}) => {
  const [formData, setFormData] = useState<IProduct>(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (visible) {
        setFormData(product ?? initialFormData);
        setErrors({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, visible]);

  const handleChange = (key: keyof IProduct, value: any) => {
    setFormData({ ...formData, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    productFormSchema.forEach((field) => {
      const value = (formData as any)[field.key];
      if (field.required) {
        if (field.type === 'text' && !value?.trim()) {
          newErrors[field.key] = `${field.label} is required`;
        }
      }
      if (field.type === 'number') {
        if (field.min !== undefined && value < field.min) {
          newErrors[field.key] = `${field.label} must be ≥ ${field.min}`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({ ...formData, id: currentProducts.length + 1});
      onHide();
    }
  };

  const renderField = (field: typeof productFormSchema[0]) => {
    const value = (formData as any)[field.key];

    const commonProps = {
      value,
      className: errors[field.key] ? 'p-invalid' : '',
    };

    switch (field.type) {
      case 'text':
        return (
          <>
            <InputText
              {...commonProps}
              onChange={(e) => handleChange(field.key as keyof IProduct, e.target.value)}
            />
            {errors[field.key] && <small className="p-error">{errors[field.key]}</small>}
          </>
        );
      case 'number':
        return (
          <>
            <InputNumber
              {...commonProps}
              onValueChange={(e) =>
                handleChange(field.key as keyof IProduct, e.value)
              }
            />
            {errors[field.key] && <small className="p-error">{errors[field.key]}</small>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      header={product ? 'Edit Product' : 'Add Product'}
      visible={visible}
      style={{ width: '450px' }}
      modal
      onHide={onHide}
    >
      <div className="p-fluid">
        {productFormSchema.map((field) => (
          <div key={field.key} className="p-field">
            <label>{field.label}</label>
            {renderField(field)}
          </div>
        ))}

        <div className="action-buttons">
          <Button label="Cancel" className="p-button-text" onClick={onHide} text/>
          <Button label="Save" className="p-button-success" onClick={handleSubmit} text/>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductFormDialog;
