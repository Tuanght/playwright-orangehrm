# 🎭 Playwright Automation – OrangeHRM

## 📌 Giới thiệu

Dự án này là **project automation testing** sử dụng **Playwright + TypeScript** để kiểm thử website **OrangeHRM**.

Mục tiêu:

- Thực hành xây dựng **framework automation chuẩn**
- Cover các **luồng nghiệp vụ chính (end-to-end)** với nhiều role khác nhau

Website test: [https://opensource-demo.orangehrmlive.com/](https://opensource-demo.orangehrmlive.com/)

---

## 🛠️ Công nghệ sử dụng

- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **Playwright Test Runner**
- **HTML Report**

---

## 📂 Cấu trúc thư mục

```
playwright-orangehrm/
│
├── src/
│   ├── component/              # Reusable UI components
│   ├── fixtures/               # Fixture Custom
│   ├── pages/                  # Page Object Models
│   ├── resources/              # Test data files
│   ├── tests/                  # Test specifications (.spec.ts)
│   ├── type/                   # Type data
│   └── utils/                  # Helper utilities
│
├── test-results/               # Output of test executions
├── package.json                # Project dependencies & scripts
├── package-lock.json           # Lock file
└── playwright.config.ts        # Playwright configuration
```

---

## 🔑 Role được kiểm thử

- **Admin** (role chính – nhiều thao tác nhất)
- **ESS (Employee Self Service)**

---

## 🔄 Các luồng nghiệp vụ được cover

### 1️⃣ Authentication

- Login thành công
- Login thất bại (sai username / password)
- Logout

### 2️⃣ Admin – User Management

- Tạo user mới
- Tìm kiếm user
- Chỉnh sửa user
- Xóa user

### 3️⃣ PIM – Employee Management

- Thêm nhân viên mới
- Tìm kiếm nhân viên
- Cập nhật thông tin nhân viên
- Xóa nhân viên

### 4️⃣ Leave Management

- Nhân viên tạo leave request
- Admin approve / reject leave

---

## ▶️ Cách chạy project

### 1. Cài đặt dependency

```bash
npm install
```

### 2. Chạy toàn bộ test

```bash
npx playwright test
```

### 3. Chạy test với UI mode

```bash
npx playwright test --ui
```

### 4. Xem report

```bash
npx playwright show-report
```

---

## ⚙️ Test Account

```text
Username: Admin
Password: admin123
```

---

## 📊 Báo cáo

- Playwright HTML Report
- Screenshot khi test fail
- Video record khi test fail
- Trace khi test fail

---

## 🎯 Mục tiêu học tập

- Hiểu cách tổ chức **automation framework thực tế**
- Áp dụng **POM + fixture**

---
