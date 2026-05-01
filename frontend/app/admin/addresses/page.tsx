"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Address = {
    id: number;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    houseNumber: number;
    isDefault: boolean;
    userId: number;
};

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const router = useRouter();

    useEffect(() => {
        setAddresses([
            {
                id: 1,
                country: "Germany",
                city: "Berlin",
                street: "Main Street",
                postalCode: "10115",
                houseNumber: 10,
                isDefault: true,
                userId: 1,
            },
            {
                id: 2,
                country: "France",
                city: "Paris",
                street: "Rue Rivoli",
                postalCode: "75001",
                houseNumber: 5,
                isDefault: false,
                userId: 2,
            },
        ]);
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Адреса</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/addresses/create")}
                >
                    + Добавить
                </button>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Страна</th>
                        <th style={styles.th}>Город</th>
                        <th style={styles.th}>Улица</th>
                        <th style={styles.th}>Дом</th>
                        <th style={styles.th}>Индекс</th>
                        <th style={styles.th}>Default</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {addresses.map((a) => (
                        <tr key={a.id} style={styles.tr}>
                            <td style={styles.td}>{a.id}</td>
                            <td style={styles.td}>{a.country}</td>
                            <td style={styles.td}>{a.city}</td>
                            <td style={styles.td}>{a.street}</td>
                            <td style={styles.td}>{a.houseNumber}</td>
                            <td style={styles.td}>{a.postalCode}</td>
                            <td style={styles.td}>
                                {a.isDefault ? (
                                    <span style={styles.badge}>Yes</span>
                                ) : (
                                    <span style={styles.badge1}>No</span>
                                )}
                            </td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() =>
                                        router.push(`/admin/addresses/${a.id}`)
                                    }
                                >
                                    Edit
                                </button>

                                <button style={styles.deleteBtn}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },

    title: {
        fontSize: "26px",
        fontWeight: 600,
        color: "black",
    },

    addBtn: {
        background: "#ff9900",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    tableContainer: {
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        color: "black",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
    },

    th: {
        textAlign: "left",
        padding: "12px",
        background: "#fafafa",
        borderBottom: "1px solid #eee",
        fontWeight: 600,
        fontSize: "14px",
        color: "black",
    },

    td: {
        padding: "12px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: "14px",
        verticalAlign: "middle",
    },

    tr: {
        transition: "0.2s",
    },

    badge: {
        background: "#d1fae5",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
    },
    badge1: {
        background: "#fa7575",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
    },

    editBtn: {
        marginRight: "8px",
        padding: "6px 10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        cursor: "pointer",
        background: "#fff",
        color: "black",
    },

    deleteBtn: {
        padding: "6px 10px",
        borderRadius: "5px",
        border: "1px solid #ff4d4f",
        color: "#ff4d4f",
        cursor: "pointer",
        background: "#fff",
      
    },
};