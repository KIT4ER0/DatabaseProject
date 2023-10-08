const prisma = require("../connection/db");

// ดึงข้อมูลคอนเสิร์ตทั้งหมด
exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await prisma.concert.findMany();
    res.status(200).json(concerts);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลคอนเสิร์ตทั้งหมด:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการดึงข้อมูลคอนเสิร์ตทั้งหมด" });
  }
};

// ดึงข้อมูลคอนเสิร์ตตาม ID ที่ระบุ
exports.getConcertById = async (req, res) => {
  try {
    const concertId = parseInt(req.params.id); // รับค่า concertId จาก URL parameter

    // ใช้ Prisma เพื่อดึงข้อมูลคอนเสิร์ตที่ตรงกับ concertId
    const concert = await prisma.concert.findUnique({
      where: {
        concert_id: concertId,
      },
    });

    if (!concert) {
      return res.status(404).json({ message: "ไม่พบคอนเสิร์ตที่ระบุ" });
    }

    // ดึงข้อมูล Artist โดยใช้ค่า artist_id จากคอนเสิร์ตที่เราดึงได้
    const artistId = concert.artist_id;
    const artist = await prisma.artist.findUnique({
      where: {
        artist_id: artistId,
      },
    });

    if (!artist) {
      return res.status(404).json({ message: "ไม่พบข้อมูล Artist ที่เกี่ยวข้องกับคอนเสิร์ต" });
    }

    // ดึงข้อมูลตั๋วที่เกี่ยวข้องกับคอนเสิร์ตนี้
    const tickets = await prisma.ticket.findMany({
      where: {
        concert_id: concertId,
      },
    });

    // สร้างข้อมูล JSON ที่รวมข้อมูล Artist และตั๋ว
    const data = {
      concert: concert,
      artist: artist,
      tickets: tickets,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล Artist และตั๋ว:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการดึงข้อมูล Artist และตั๋ว" });
  }
};

// สร้างคอนเสิร์ตใหม่ในฐานข้อมูล
exports.addConcert = async (req, res) => {
  try {
    const { name, start_time, end_time, venue, img_url, details, artist_id } = req.body;

    // ตรวจสอบข้อมูลที่ส่งมาให้ครบถ้วน
    if (!name || !start_time || !end_time || !venue || !img_url || !artist_id) {
      return res.status(400).json({ message: 'โปรดส่งข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    // สร้างคอนเสิร์ตใหม่
    const newConcert = await prisma.concert.create({
      data: {
        name,
        start_time: start_time,
        end_time: end_time,
        venue,
        details,
        img_url: img_url,
        artist_id,
      },
    });

    // ส่งข้อมูลคอนเสิร์ตที่ถูกสร้างขึ้นในระบบกลับไปยังผู้ใช้
    res.status(201).json({ message: 'เพิ่มคอนเสิร์ตสำเร็จ', newConcert });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มคอนเสิร์ต:', error);
    res.status(500).json({ message: 'มีข้อผิดพลาดในการเพิ่มคอนเสิร์ต' });
  } finally {
    // อย่าลืมใช้คำสั่ง prisma.$disconnect() เพื่อปิดการเชื่อมต่อ PrismaClient เมื่อเสร็จสิ้น
    await prisma.$disconnect();
  }
};

exports.updateConcert = async (req, res) => {
  try {
    const concertId = parseInt(req.params.id); // รับ ID จาก URL parameter
    const { name, start_time, end_time, venue, img_url, details, artist_id } = req.body;

    // ตรวจสอบว่าคอนเสิร์ตที่ต้องการแก้ไขมีอยู่หรือไม่
    const existingConcert = await prisma.concert.findUnique({
      where: {
        concert_id: concertId,
      },
    });

    if (!existingConcert) {
      return res.status(404).json({ message: "ไม่พบคอนเสิร์ตที่ต้องการแก้ไข" });
    }

    // ทำการแก้ไขข้อมูลคอนเสิร์ต
    const updatedConcert = await prisma.concert.update({
      where: {
        concert_id: concertId,
      },
      data: {
        name,
        start_time: start_time,
        end_time: end_time,
        venue,
        details,
        img_url: img_url,
        artist_id: artist_id,
      },
    });

    res.status(200).json({ message: "แก้ไขคอนเสิร์ตสำเร็จ", updatedConcert });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการแก้ไขคอนเสิร์ต:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการแก้ไขคอนเสิร์ต" });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const concertId = parseInt(req.params.id); // รับ ID จาก URL parameter

    // ตรวจสอบว่าคอนเสิร์ตที่ต้องการลบมีอยู่หรือไม่
    const existingConcert = await prisma.concert.findUnique({
      where: {
        concert_id: concertId,
      },
    });

    if (!existingConcert) {
      return res.status(404).json({ message: "ไม่พบคอนเสิร์ตที่ต้องการลบ" });
    }

    // ทำการลบคอนเสิร์ต
    await prisma.concert.delete({
      where: {
        concert_id: concertId,
      },
    });

    res.status(200).json({ message: "ลบคอนเสิร์ตสำเร็จ" });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบคอนเสิร์ต:", error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการลบคอนเสิร์ต" });
  }
};
