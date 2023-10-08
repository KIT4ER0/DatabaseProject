const prisma = require("../connection/db"); // Import Prisma Client

exports.createArtist = async (req, res) => {
  try {
    const { name, genre } = req.body; // รับข้อมูลจาก request body

    // สร้างข้อมูล Artist ใหม่
    const newArtist = await prisma.Artist.create({
      data: {
        name,
        genre,
      },
    });

    res.status(201).json({ message: "เพิ่มข้อมูล Artist สำเร็จ", newArtist });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล Artist:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการเพิ่มข้อมูล Artist" });
  }
};
