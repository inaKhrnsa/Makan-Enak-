document.getElementById("placeOrder").addEventListener("click", function () {
    const buyerName = document.getElementById("buyerName").value.trim();
    if (!buyerName) {
        alert("Masukkan nama pembeli!");
        return;
    }

    const menuItems = document.querySelectorAll(".menu-card input[type='number']");
    let total = 0;
    let orderDetails = "";

    menuItems.forEach(item => {
        const price = parseInt(item.dataset.price, 10);
        const quantity = parseInt(item.value, 10) || 0;
        if (quantity > 0) {
            total += price * quantity;
            orderDetails += `
                <tr>
                    <td>${item.closest(".menu-card").querySelector("h3").innerText}</td>
                    <td>${quantity}</td>
                    <td>Rp ${price.toLocaleString("id-ID")}</td>
                    <td>Rp ${(price * quantity).toLocaleString("id-ID")}</td>
                </tr>`;
        }
    });

    if (total === 0) {
        alert("Pilih setidaknya satu menu!");
        return;
    }

    document.getElementById("totalPrice").innerText = `Rp ${total.toLocaleString("id-ID")}`;

    const receiptHTML = `
        <h3>Struk Pembelian</h3>
        <p>Nama Pembeli: ${buyerName}</p>
        <table>
            <thead>
                <tr>
                    <th>Menu</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${orderDetails}
            </tbody>
        </table>
        <p>Total Harga: Rp ${total.toLocaleString("id-ID")}</p>
    `;

    document.getElementById("receiptBox").innerHTML = receiptHTML;
});

document.getElementById("calculateChange").addEventListener("click", function () {
    const totalPrice = parseInt(document.getElementById("totalPrice").innerText.replace(/\D/g, ''), 10) || 0;
    const paymentAmount = parseInt(document.getElementById("paymentAmount").value, 10) || 0;
    const change = paymentAmount - totalPrice;

    if (totalPrice === 0) {
        alert("Pesan dulu sebelum menghitung kembalian!");
        return;
    }

    if (paymentAmount < totalPrice) {
        document.getElementById("changeOutput").innerText = `Uang tidak cukup. Kurang Rp ${Math.abs(change).toLocaleString("id-ID")}`;
        return;
    }

    const changeHTML = `
        <p>Pembayaran: Rp ${paymentAmount.toLocaleString("id-ID")}</p>
        <p>Kembalian: Rp ${change.toLocaleString("id-ID")}</p>
    `;

    document.getElementById("changeOutput").innerText = `Kembalian Anda: Rp ${change.toLocaleString("id-ID")}`;
    document.getElementById("receiptBox").innerHTML += changeHTML;
});
