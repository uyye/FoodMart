import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Untuk membuat tabel otomatis dalam PDF
import { formatIDR } from "../../helpers/formatIDR";
import formateDate from "../../helpers/formateDate";
import formateHours from "../../helpers/formateHours";
import "./invoiceModal.css"; // CSS untuk styling modal

export default function InvoiceModal({ order, onClose }) {
    const handlePrintPDF = () => {
        const doc = new jsPDF();

        // Menambahkan teks dan informasi dasar
        doc.setFontSize(16);
        doc.text(`Invoice - Order ID: ${order.id}`, 10, 10);

        doc.setFontSize(12);
        doc.text(`Customer: ${order.User.name}`, 10, 20);
        doc.text(`Status: ${order.status}`, 10, 30);
        doc.text(`Date: ${formateDate(order.createdAt)} ${formateHours(order.createdAt)}`, 10, 40);

        // Membuat tabel dengan data order details
        const tableData = order.OrderDetails.map(item => [
            item.Product.name,
            item.quantity,
            formatIDR(item.subTotal),
        ]);

        // Menambahkan tabel ke dalam PDF
        doc.autoTable({
            head: [['Item', 'Qty', 'Price']],
            body: tableData,
            startY: 50,
        });

        // Menambahkan total harga
        doc.text(`Total: ${formatIDR(order.totalPrice)}`, 10, doc.autoTable.previous.finalY + 10);

        // Mendownload PDF
        doc.save(`Invoice-${order.id}.pdf`);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="modal-content">
                    <h2>Invoice</h2>
                    <div>
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Customer:</strong> {order.User.name}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Date:</strong> {formateDate(order.createdAt)} {formateHours(order.createdAt)}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.OrderDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatIDR(item.subTotal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <p><strong>Total:</strong> {formatIDR(order.totalPrice)}</p>
                    </div>
                    <button className="print-button" onClick={handlePrintPDF}>
                        Download Invoice as PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
