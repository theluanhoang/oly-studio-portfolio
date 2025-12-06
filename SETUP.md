# Hướng Dẫn Setup Dự Án

## Yêu Cầu

- Node.js 18+ 
- PostgreSQL database
- npm hoặc yarn
- Docker và Docker Compose (khuyến nghị)

## Cách 1: Setup với Docker (Khuyến nghị)

### Development

1. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

2. Chỉnh sửa `.env` nếu cần (mặc định đã đủ để chạy)

3. Khởi động services:

```bash
# Sử dụng Makefile (khuyến nghị)
make dev

# Hoặc sử dụng docker-compose trực tiếp
docker-compose up -d
```

4. Truy cập ứng dụng tại `http://localhost:3000`

### Production

1. Tạo file `.env.production` từ `.env.production.example`:

```bash
cp .env.production.example .env.production
```

2. Cập nhật các giá trị trong `.env.production` (đặc biệt là passwords)

3. Build và khởi động:

```bash
# Sử dụng Makefile
make prod

# Hoặc sử dụng docker-compose trực tiếp
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Xem thêm chi tiết trong `docker/README.md`

## Cách 2: Setup Local (Không dùng Docker)

### Cài Đặt Dependencies

```bash
npm install
```

### Cấu Hình Database

1. Tạo file `.env` trong thư mục gốc:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

2. Chạy Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

Hoặc nếu muốn tạo migration file:

```bash
npx prisma migrate dev --name init
```

### Chạy Ứng Dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Cấu Trúc Form Tạo Dự Án

### Bước 1: Thông Tin Dự Án
- Tên dự án (tự động tạo slug)
- Thể loại
- Địa điểm
- Diện tích
- Năm thực hiện
- Gallery ảnh (upload nhiều ảnh, ảnh đầu tiên làm hero image)

### Bước 2: Nội Dung Bài Viết
- Rich text editor với các tính năng:
  - Định dạng văn bản (bold, italic, strike)
  - Heading levels (H1-H6)
  - Font family
  - Font size
  - Text color
  - Lists (bullet, numbered)
  - Links
  - Images
  - YouTube embeds

## Lưu Ý

- Slug được tự động tạo từ tên dự án
- Ảnh đầu tiên trong gallery sẽ được dùng làm hero image
- Dự án sau khi lưu sẽ tự động hiển thị trên trang `/projects`
- Form đã được tối ưu responsive cho desktop, tablet và mobile

