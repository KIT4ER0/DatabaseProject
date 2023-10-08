const prisma = require("../connection/db");

exports.searchConcertByName = async (req, res) => {
    try {
      const { name } = req.body;

      const concerts = await prisma.concert.findMany({
        where: {
          name: {
            contains: name, // ใช้ contains หรือเงื่อนไขใดๆ ที่คุณต้องการ
          },
        },
      });
  
      res.status(200).json(concerts);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการค้นหาคอนเสิร์ตตามชื่อ:", error);
      res.status(500).json({ message: "มีข้อผิดพลาดในการค้นหาคอนเสิร์ต" });
    }
  };
  