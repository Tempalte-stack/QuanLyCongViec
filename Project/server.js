const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const config = {
    user: "sa",
    password: "123456789",
    server: "DESKTOP-K75GJ98",
    database: "WebBanHang",
    options: {
        trustServerCertificate: true
    }
};


app.get("/api/sanpham", async (req, res) => {
    console.log("Đã gọi API /api/sanpham");

    try {
        await sql.connect(config);

        const result = await sql.query(
            "SELECT * FROM SanPham"
        );

        res.json(result.recordset);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.use(express.json());

app.post("/api/sanpham", async (req, res) => {
    try {

        const { TenSP, Gia, SoLuong } = req.body;

        await sql.connect(config);

        await sql.query`
            INSERT INTO SanPham(TenSP, Gia, SoLuong)
            VALUES(${TenSP}, ${Gia}, ${SoLuong})
        `;

        res.send("Thêm thành công");

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.delete("/api/sanpham/:id", async (req, res) => {
    try {

        const id = req.params.id;

        await sql.connect(config);

        await sql.query`
            DELETE FROM SanPham
            WHERE Id = ${id}
        `;

        res.send("Xóa thành công");

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.put("/api/sanpham/:id", async (req, res) => {

    try {

        const id = req.params.id;
        const { TenSP, Gia, SoLuong } = req.body;

        await sql.connect(config);

        await sql.query`
            UPDATE SanPham
            SET
                TenSP = ${TenSP},
                Gia = ${Gia},
                SoLuong = ${SoLuong}
            WHERE Id = ${id}
        `;

        res.send("Cập nhật thành công");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});