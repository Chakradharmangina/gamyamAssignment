import { useEffect, useMemo, useState } from "react";
import ApiService from "../api/ApiService"
import type { IProduct } from "../Interface/products";
import Header from "../atoms/Header";
import ProductView from "./ProductView";
import { useDebounceValue } from "../hooks/useDebounceValue";
import EmptyPlaceholder from "./EmptyPlaceholder";
import ProductFormDialog from "./ProductFormDailog";


export const Home = () => {
    const ajax = new ApiService()
    const [productsList, setProductList] = useState<IProduct[]>([]);
    const [isListView, setIsListView] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState('');
    const [showProductForm, setShowProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const products = useMemo(() => ajax.fetchProducts(), []);

    const debouncedValue = useDebounceValue(searchValue);

    const onAddProduct = () => {
        setShowProductForm(true)
    }

    const onEditProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setShowProductForm(true);
    }

    const hanldeSaveProduct = (product: IProduct) => {
        if (selectedProduct) {
            setProductList(
                productsList.map((p) => {
                    if (p.id === selectedProduct.id) {
                        return product
                    }
                    return p;
                })
            )
            setSelectedProduct(null);
        } else {
            setProductList([product, ...productsList])
        }
    }


    useEffect(() => setProductList(products), [products])

    useEffect(() => setProductList(products.filter((i) => i.name?.toLowerCase()?.includes(debouncedValue))), [debouncedValue])

    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, []);
    
    return <>
        <div className="home">
            <Header appName="gamyam" onSearch={(value) => setSearchValue(value)} onAddProduct={onAddProduct} onToggleView={() => setIsListView(!isListView)} isListView={isListView} />
            {!productsList.length ? 
                <EmptyPlaceholder isLoading={loading}/> :
                <ProductView
                    onEditProduct={onEditProduct}
                    products={productsList}
                    isListView={isListView}
                />
            }
            <ProductFormDialog
                visible={showProductForm}
                product={selectedProduct as IProduct}
                onHide={() => {
                    setShowProductForm(false)
                    setSelectedProduct(null);
                }}
                onSave={(product) => hanldeSaveProduct(product)}
                currentProducts={productsList}
            />
        </div>
    </>
}