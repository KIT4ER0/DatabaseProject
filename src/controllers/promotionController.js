const prisma = require("../connection/db");

exports.addPromotion = async (req, res) => {
    try {
      const { name, description, discount_percentage, start_date, end_date, discount_code } = req.body;
  
      // ตรวจสอบข้อมูลที่ส่งมาให้ครบถ้วน
      if (!name || !description || !discount_percentage || !start_date || !end_date || !discount_code) {
        return res.status(400).json({ message: 'โปรดส่งข้อมูลที่จำเป็นให้ครบถ้วน' });
      }
  
      // สร้างโปรโมชั่นใหม่
      const newPromotion = await prisma.promotion.create({
        data: {
          name,
          description,
          discount_percentage,
          start_date,
          end_date,
          discount_code,
        },
      });
  
      res.status(201).json({ message: 'เพิ่มโปรโมชั่นสำเร็จ', newPromotion });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มโปรโมชั่น:', error);
      res.status(500).json({ message: 'มีข้อผิดพลาดในการเพิ่มโปรโมชั่น' });
    }
  };
  