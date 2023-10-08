const prisma = require("../connection/db");

// Controller สำหรับสร้างการจองใหม่
exports.createBooking = async (req, res) => {
  try {
    // รับข้อมูลจาก HTTP request body
    const {
      cust_id,
      concert_id,
      ticket_id,
      quantity,
      total_price,
      booking_date,
      promotion_id,
    } = req.body;

    // ตรวจสอบว่าข้อมูลที่จำเป็นสำหรับการสร้างการจองถูกส่งมาหรือไม่
    if (!cust_id || !concert_id || !ticket_id || !quantity || !total_price || !booking_date) {
      return res.status(400).json({ message: 'โปรดส่งข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    // ใช้ Prisma เพื่อสร้างการจองใหม่ในฐานข้อมูล
    const booking = await prisma.booking.create({
      data: {
        cust_id,
        concert_id,
        ticket_id,
        quantity,
        total_price,
        booking_date,
        promotion_id,
      },
    });

    // ส่งคำตอบ HTTP สถานะ 201 (Created) พร้อมข้อมูลการจองที่ถูกสร้าง
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);

    // ส่งคำตอบ HTTP สถานะ 500 (Internal Server Error) หากเกิดข้อผิดพลาด
    res.status(500).json({ error: 'ไม่สามารถสร้างการจองได้' });
  }
};
