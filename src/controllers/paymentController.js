const prisma = require("../connection/db");

exports.createPayment = async (req, res) => {
    try {
      const { cust_id, card_number, expiry_date, cvv } = req.body;
  
      // ตรวจสอบข้อมูลที่ส่งมาให้ครบถ้วน
      if (!cust_id || !card_number || !expiry_date || !cvv) {
        return res.status(400).json({ message: 'โปรดส่งข้อมูลที่จำเป็นให้ครบถ้วน' });
      }
  
      // สร้างข้อมูล Payment ใหม่
      const newPayment = await prisma.payment.create({
        data: {
          cust_id,
          card_number,
          expiry_date,
          cvv,
        },
      });
  
      res.status(201).json({ message: 'เพิ่มข้อมูล Payment สำเร็จ', newPayment });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล Payment:', error);
      res.status(500).json({ message: 'มีข้อผิดพลาดในการเพิ่มข้อมูล Payment' });
    } finally {
      await prisma.$disconnect();
    }
  };

  // Controller สำหรับดึงข้อมูล Payment ด้วย cust_id
exports.getPaymentsByCustomerId = async (req, res) => {
    try {
      const customerId = parseInt(req.params.id); // รับค่า customerId จาก URL parameter
  
      // ใช้ Prisma เพื่อดึงข้อมูล Payments ที่ตรงกับ customerId
      const payments = await prisma.payment.findMany({
        where: {
          cust_id: customerId,
        },
      });
  
      res.status(200).json(payments);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Payments:', error);
      res.status(500).json({ message: 'มีข้อผิดพลาดในการดึงข้อมูล Payments' });
    } finally {
      await prisma.$disconnect();
    }
  };