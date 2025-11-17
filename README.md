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

⚙️ Cấu hình môi trường

Tạo file .env ở root (cùng cấp với package.json), nội dung ví dụ:

PORT=5000
DATABASE_URL="file:./dev.db"      # SQLite (dev)
JWT_SECRET="super_secret_key"


Khi deploy thực tế có thể dùng PostgreSQL/MySQL:
DATABASE_URL="postgresql://user:pass@host:5432/dbname?schema=public"

🚀 Cài đặt & Chạy dự án
1. Cài dependencies
npm install
# hoặc
yarn

2. Tạo database & migration Prisma
npx prisma migrate dev --name init


Nếu có file seed:

npx prisma db seed

3. Chạy server dev
npm run dev
# hoặc
yarn dev


Mặc định server chạy tại:
👉 http://localhost:4000

🔐 Một số API chính (ví dụ)
Auth

POST /api/auth/register
Body:

{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "123456"
}


POST /api/auth/login
Trả về:

{
  "token": "JWT_TOKEN",
  "user": { "id": "...", "name": "...", "email": "..." }
}

Course & Lessons

GET /api/courses – danh sách khóa học

GET /api/courses/:id – chi tiết khóa học

GET /api/lessons/by-course/:courseId – danh sách bài học của khóa

POST /api/lessons/:lessonId/complete – đánh dấu hoàn thành (yêu cầu JWT)

✅ Gợi ý kết nối với FRONTEND

Trong app React Native / web, đặt base URL:

const API_BASE_URL = "http://<IP_MAY_TINH>:5000";


Ví dụ khi chạy trên điện thoại thật:

Máy tính: 192.168.1.10

Gọi API: http://192.168.1.10:4000/api/courses

👨‍💻 Dev

Author: Nhóm BTL E-Learning

Mọi góp ý / issue vui lòng tạo tại tab Issues của repo.


---

