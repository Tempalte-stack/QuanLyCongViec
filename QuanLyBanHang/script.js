let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

updateCart();

function addToCart(name, price) {

    cart.push({
        name,
        price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    alert("Đã thêm vào giỏ hàng");
}

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const count =
        document.getElementById("cart-count");

    cartItems.innerHTML = "";

    cart.forEach(item => {

        cartItems.innerHTML +=
            `
<li>
${item.name}
-
${item.price.toLocaleString()}đ
</li>
`;

    });

    count.innerText = cart.length;
}

document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        let name =
            document.getElementById("name").value;

        let email =
            document.getElementById("email").value;

        let message =
            document.getElementById("message").value;

        if (name === "") {
            alert("Nhập họ tên");
            return;
        }

        if (email === "") {
            alert("Nhập email");
            return;
        }

        if (!email.includes("@")) {
            alert("Email không hợp lệ");
            return;
        }

        if (message === "") {
            alert("Nhập nội dung");
            return;
        }

        alert("Gửi thành công");

        this.reset();

    });