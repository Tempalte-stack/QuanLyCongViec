fetch('/api/sanpham')
    .then(res => res.json())
    .then(data => {

        let html = '';

        data.forEach(sp => {

            html += `
        <div>
            <h3>${sp.TenSP}</h3>
            <p>Giá: ${Number(sp.Gia).toLocaleString('vi-VN')} VNĐ</p>
            <p>Số lượng: ${sp.SoLuong}</p>

           <button onclick="suaSanPham(
                 ${sp.Id},
                '${sp.TenSP}',
                 ${sp.Gia},
                 ${sp.SoLuong}
)">
    Sửa
</button>

            <button onclick="xoaSanPham(${sp.Id})">
                Xóa
            </button>

            <hr>
        </div>
        `;

        });

        document.getElementById('products').innerHTML = html;
    });


async function themSanPham() {

    const TenSP = document.getElementById("tenSP").value;
    const Gia = document.getElementById("gia").value;
    const SoLuong = document.getElementById("soLuong").value;

    const response = await fetch("/api/sanpham", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            TenSP,
            Gia,
            SoLuong
        })
    });

    alert(await response.text());

    location.reload();
}

async function xoaSanPham(id) {

    if (!confirm("Bạn có chắc muốn xóa không?")) {
        return;
    }

    const response = await fetch(`/api/sanpham/${id}`, {
        method: "DELETE"
    });

    alert(await response.text());

    location.reload();
}

function suaSanPham(id, tenSP, gia, soLuong) {

    document.getElementById("editId").value = id;
    document.getElementById("editTenSP").value = tenSP;
    document.getElementById("editGia").value = gia;
    document.getElementById("editSoLuong").value = soLuong;

}

async function capNhatSanPham() {

    const id = document.getElementById("editId").value;

    const TenSP = document.getElementById("editTenSP").value;
    const Gia = document.getElementById("editGia").value;
    const SoLuong = document.getElementById("editSoLuong").value;

    const response = await fetch(
        `/api/sanpham/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                TenSP,
                Gia,
                SoLuong
            })
        }
    );

    alert(await response.text());

    location.reload();
}
