"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PRODUCT_API = "http://localhost:5012/api/product";
const CATEGORY_API = "http://localhost:5012/api/category";
const PRODUCT_IMAGE_API = "http://localhost:5012/api/productimage";
const PRODUCT_CATEGORY_API = "http://localhost:5012/api/productcategory";

type Category = {
    id: number;
    name: string;
};

export default function CreateProductPage() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        sale: "",
        description: "",
        available: true,
        warranty: "",
        maxQuantity: "",
        brand: "",
        quality: "New",
        aboutItems: "",
    });

    useEffect(() => {
        const loadCategories = async () => {
            const res = await fetch(CATEGORY_API);

            if (!res.ok) {
                console.error("Failed to load categories:", res.status);
                return;
            }

            const data = await res.json();
            setCategories(data);
        };

        loadCategories();
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const uploadImages = async (productId: number) => {
        for (let index = 0; index < files.length; index++) {
            const formData = new FormData();

            formData.append("productId", String(productId));
            formData.append("file", files[index]);
            formData.append("isMain", String(index === 0));
            formData.append("sortOrder", String(index));

            const res = await fetch(PRODUCT_IMAGE_API, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                console.error("Failed to upload product image:", res.status);
                return false;
            }
        }

        return true;
    };

    const createProductCategories = async (productId: number) => {
        for (const categoryId of selectedCategoryIds) {
            const res = await fetch(PRODUCT_CATEGORY_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    categoryId: Number(categoryId),
                }),
            });

            if (!res.ok) {
                console.error("Failed to create product category:", res.status);
                return false;
            }
        }

        return true;
    };

    const handleCreate = async () => {
        const metadata = {
            attribute: {
                Brand: form.brand,
                Condition: form.quality,
            },
            aboutItems: form.aboutItems
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        const res = await fetch(PRODUCT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: form.name,
                price: Number(form.price),
                sale: form.sale ? Number(form.sale) : null,
                description: form.description,
                available: form.available,
                warranty: form.warranty,
                maxQuantity: Number(form.maxQuantity),
                metadata,
            }),
        });

        if (!res.ok) {
            console.error("Failed to create product:", res.status);
            return;
        }

        const product = await res.json();
        const productId = product.id ?? product.Id;

        if (!productId) {
            console.error("Created product id was not returned");
            return;
        }

        const categoriesCreated = await createProductCategories(productId);

        if (!categoriesCreated) return;

        const imagesUploaded = await uploadImages(productId);

        if (!imagesUploaded) return;

        router.push("/admin/products");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить продукт</h1>

                <div style={styles.form}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Название"
                        style={styles.input}
                    />

                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Цена"
                        style={styles.input}
                    />

                    <input
                        name="sale"
                        value={form.sale}
                        onChange={handleChange}
                        placeholder="Скидка"
                        style={styles.input}
                    />

                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        style={styles.input}
                    />

                    <select
                        name="quality"
                        value={form.quality}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="New">New</option>
                        <option value="Renewed">Renewed</option>
                        <option value="Used">Used</option>
                    </select>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Описание"
                        style={styles.textarea}
                    />

                    <textarea
                        name="aboutItems"
                        value={form.aboutItems}
                        onChange={handleChange}
                        placeholder="About items, каждый пункт с новой строки"
                        style={styles.textarea}
                    />

                    <input
                        name="warranty"
                        value={form.warranty}
                        onChange={handleChange}
                        placeholder="Гарантия"
                        style={styles.input}
                    />

                    <input
                        name="maxQuantity"
                        value={form.maxQuantity}
                        onChange={handleChange}
                        placeholder="Максимальное количество"
                        style={styles.input}
                    />

                    <select
                        multiple
                        value={selectedCategoryIds}
                        onChange={(e) =>
                            setSelectedCategoryIds(
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                        style={styles.selectMultiple}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) =>
                                setForm({ ...form, available: e.target.checked })
                            }
                        />
                        Доступен
                    </label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                        style={styles.input}
                    />

                    {files.length > 0 && (
                        <div style={styles.previewList}>
                            {files.map((file, index) => (
                                <div key={index} style={styles.previewItem}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={styles.previewImage}
                                    />
                                    <span>{file.name}</span>
                                    {index === 0 && <span style={styles.badge}>Main</span>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/products")}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: any = {
    page: {
        padding: "40px",
        background: "#f5f6fa",
        minHeight: "100vh",
        fontFamily: "Arial",
    },
    card: {
        maxWidth: "700px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    title: {
        fontSize: "22px",
        fontWeight: 600,
        marginBottom: "20px",
        color: "black",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        background: "#fff",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "90px",
        resize: "vertical",
        background: "#fff",
    },
    selectMultiple: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "110px",
        background: "#fff",
    },
    checkbox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
        color: "black",
    },
    previewList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "black",
    },
    previewItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "13px",
    },
    previewImage: {
        width: "52px",
        height: "52px",
        objectFit: "cover",
        borderRadius: "6px",
    },
    badge: {
        background: "#d1fae5",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
    },
    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
    },
    saveBtn: {
        background: "#ff9900",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    cancelBtn: {
        background: "#eee",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        color: "black",
    },
};