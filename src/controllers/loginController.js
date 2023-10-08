const prisma = require("../connection/db");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ค้นหาผู้ใช้งานด้วยชื่อผู้ใช้
    const user = await prisma.user.findUnique({ where: { username } });

    // ตรวจสอบว่ามีผู้ใช้งานหรือไม่
    if (!user) {
      return res.status(401).json({ message: "ชื่อผู้ใช้งานไม่ถูกต้อง" });
    }

    // ตรวจสอบรหัสผ่าน
    if (user.password === password) {
      // ส่งข้อมูลผู้ใช้งานกลับไปยัง client หรือทำสิ่งอื่นตามที่ต้องการ
      loggedInUserId = user.user_id;
      res.status(200).json({ message: "ลงชื่อเข้าใช้สำเร็จ", user });
    } else {
      res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการลงชื่อเข้าใช้" });
  }
};

exports.getUserInfoById = async (req, res) => {
  try {
    const userId = loggedInUserId;

    if (!userId) {
      return res.status(400).json({ message: "โปรดระบุรหัสผู้ใช้" });
    }

    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งานที่ระบุ" });
    }

    if (user.role === "Admin") {
      const admin = await prisma.admin.findFirst({
        where: {
          user_id: userId,
        },
        select: {
          first_name: true,
          last_name: true,
          tel: true,
        },
      });

      if (!admin) {
        return res.status(404).json({ message: "ไม่พบข้อมูล Admin ที่เกี่ยวข้องกับผู้ใช้งาน" });
      }

      const userInfo = {
        user,
        admin,
      };

      res.status(200).json(userInfo);
    } else if (user.role === "Customer") {
      const customer = await prisma.customer.findFirst({
        where: {
          user_id: userId,
        },
        select: {
          first_name: true,
          last_name: true,
          tel: true,
        },
      });

      if (!customer) {
        return res.status(404).json({ message: "ไม่พบข้อมูล Customer ที่เกี่ยวข้องกับผู้ใช้งาน" });
      }

      const userInfo = {
        user,
        customer,
      };

      res.status(200).json(userInfo);
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
};
