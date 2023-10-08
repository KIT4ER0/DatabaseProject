const prisma = require("../connection/db");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, role, first_name, last_name, tel } = req.body;

    // ตรวจสอบว่ามีผู้ใช้ username นี้ในระบบแล้วหรือไม่
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "ชื่อผู้ใช้งานนี้ถูกใช้แล้ว" });
    }
    
    // ตรวจสอบว่ามีผู้ใช้อีเมลนี้แล้วหรือไม่
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
    }

    // สร้างผู้ใช้
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
      },
    });

    // ตรวจสอบบทบาทและสร้างข้อมูลเพิ่มเติม (Customer หรือ Admin)
    if (role === "Customer") {
      await prisma.customer.create({
        data: {
          user_id: newUser.user_id,
          first_name,
          last_name,
          tel,
        },
      });
    } else if (role === "Admin") {
      await prisma.admin.create({
        data: {
          user_id: newUser.user_id,
          first_name,
          last_name,
          tel,
        },
      });
    }

    res.status(201).json({ message: "ลงทะเบียนสำเร็จ", newUser });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการลงทะเบียน" });
  }
};

