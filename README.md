# 🧠 E-Learning App – BACKEND

Backend cho ứng dụng E-Learning (mobile/web).  
Cung cấp API cho:

- Đăng ký / đăng nhập người dùng
- Quản lý khóa học
- Danh sách bài học trong khóa
- Theo dõi tiến độ học (Lesson Progress)
- (Có thể mở rộng: thanh toán, đánh giá, yêu thích, v.v.)

---

## 🔧 Công nghệ sử dụng

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite / PostgreSQL / MySQL** (tùy cấu hình `DATABASE_URL`)
- **JWT** – xác thực người dùng
- **bcrypt** – mã hóa mật khẩu
- Cùng một số thư viện hỗ trợ khác (cors, dotenv, morgan, ...)

---

## 📂 Cấu trúc thư mục 

```bash
E-Learning-App-BACKEND/
├── src/
│   ├── index.ts            # Điểm vào chính của server
│   ├── config/
│   │   └── db.ts           # Kết nối Prisma
│   ├── middleware/
│   │   └── requireAuth.ts  # Middleware xác thực JWT
│   ├── routes/
│   │   ├── auth.routes.ts  # Đăng ký / đăng nhập
│   │   ├── course.routes.ts
│   │   └── lesson.routes.ts
│   ├── controllers/
│   └── utils/
├── prisma/
│   ├── schema.prisma       # Định nghĩa model
│   └── seed.ts             # Dữ liệu mẫu
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
