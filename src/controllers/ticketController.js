const prisma = require("../connection/db");

// เพิ่มข้อมูลตั๋วลงในคอนเสิร์ตที่ระบุ
exports.createTicket = async (req, res) => {
  try {
    const { concert_id, ticket_type_name, ticket_price, quantity } = req.body;

    // สร้างข้อมูลตั๋วใหม่
    const newTicket = await prisma.ticket.create({
      data: {
        concert_id,
        ticket_type_name,
        ticket_price,
        quantity,
      },
    });

    res.status(201).json({ message: "เพิ่มข้อมูลตั๋วสำเร็จ", newTicket });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลตั๋ว:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการเพิ่มข้อมูลตั๋ว" });
  }
};
