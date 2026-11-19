# Machine Shop Control Board

ระบบควบคุมเครื่องมือช่าง สต็อก และการตรวจก่อนกลับบ้านของ Machine Shop
เปิดใช้งานผ่านเว็บ ล็อกอินด้วยรหัสพนักงาน + PIN 6 หลัก ข้อมูลเก็บใน Firebase

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าเว็บแอปทั้งหมด (GitHub Pages เปิดไฟล์นี้) |
| `firebase-config.js` | ค่าตั้งของโปรเจกต์ Firebase ต้องแก้ก่อนใช้งาน |
| `firestore.rules` | กฎความปลอดภัยของฐานข้อมูล ต้องนำไปวางใน Firebase Console |
| `claude-artifact/index.html` | เวอร์ชันเดิมที่ใช้บน claude.ai เก็บไว้อ้างอิง |

## ความสามารถ

- **สต็อก** เครื่องมือช่างและอะไหล่เครื่องจักร พร้อม Safety stock, จุดสั่งซื้อ, จำนวนที่ควรสั่ง และ Cycle count
- **ตรวจก่อนกลับ** บอร์ดเครื่องมือ (ขาด / ยืมอยู่ / ชำรุด), เช็คสภาพเครื่องจักรทีละเครื่อง, ชั้นวัสดุและพื้นที่
- **สรุป** ของหายค้าง, ของชำรุด, ของที่หายบ่อย, ของที่ยืมนาน และเครื่องจักรที่ไม่ผ่านบ่อย ใน 30 วัน
- **จัดการบอร์ด** เพิ่ม แก้ไข ลบเครื่องมือ พร้อม Serial no. และแบรนด์/รุ่นเครื่องจักร
- **ผู้ใช้** หัวหน้าสร้างบัญชีให้ช่าง กำหนดสิทธิ์ และปิดใช้งานบัญชีได้
- **ประวัติ** ผลตรวจย้อนหลัง หัวหน้าแก้ไขหรือลบได้

## สิทธิ์ผู้ใช้

| สิทธิ์ | ทำได้ |
|---|---|
| ช่าง (Technician) | ตรวจก่อนกลับ, นับสต็อก, รับเข้า-เบิกออก, แจ้งของหาย / ชำรุด / เจอคืน, เปลี่ยน PIN ของตัวเอง |
| หัวหน้า (Admin) | ทั้งหมดข้างบน + เพิ่ม / แก้ / ลบรายการเครื่องมือและสต็อก, แก้ / ลบประวัติ, จัดการผู้ใช้, นำเข้าข้อมูล |

ผู้ที่ไม่ได้ล็อกอินจะไม่เห็นข้อมูลใดๆ กฎใน `firestore.rules` บังคับสิทธิ์นี้ที่ฐานข้อมูลด้วย ไม่ใช่แค่ซ่อนปุ่มบนหน้าจอ

## ตั้งค่าครั้งแรก (ประมาณ 15 นาที)

### 1. สร้างโปรเจกต์ Firebase
1. ไปที่ https://console.firebase.google.com → **Create a project** ตั้งชื่อ เช่น `machine-shop-control-board` (ปิด Google Analytics ได้)
2. เมนู **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save**
   (ระบบใช้รหัสพนักงาน + PIN แต่เบื้องหลังใช้ Email/Password ของ Firebase ช่างไม่ต้องมีอีเมล)
3. เมนู **Build → Firestore Database → Create database** เลือก location `asia-southeast1 (Singapore)` และ **Start in production mode**
4. ในหน้า Firestore แท็บ **Rules** ลบของเดิมออก แล้ววางเนื้อหาไฟล์ `firestore.rules` ทั้งหมด → **Publish**

### 2. เชื่อมเว็บกับ Firebase
1. Firebase Console → ไอคอนเฟือง **Project settings → General → Your apps** → กดไอคอน **`</>`** (Web) → ตั้งชื่อ → **Register app**
2. คัดลอกค่าใน `firebaseConfig` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
3. ใน GitHub เปิดไฟล์ `firebase-config.js` → กดรูปดินสอ (Edit) → แทนค่า `YOUR_...` ด้วยค่าที่คัดลอกมา → **Commit changes**

### 3. เปิด GitHub Pages
1. GitHub repo → **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: `main` / `(root)` → **Save**
3. รอ 1–2 นาที จะได้ลิงก์ `https://sutthipongm57-ctr.github.io/Machine-Shop-Control-Board/`
4. Firebase Console → **Authentication → Settings → Authorized domains → Add domain** → ใส่ `sutthipongm57-ctr.github.io`

> GitHub Pages แบบฟรีใช้ได้กับ repo แบบ Public เท่านั้น ข้อมูลไม่ได้อยู่ใน repo แต่อยู่ใน Firebase ที่ต้องล็อกอินก่อน

### 4. สร้างบัญชีหัวหน้าและย้ายข้อมูล
1. เปิดลิงก์เว็บ ครั้งแรกจะขึ้นหน้า **ตั้งค่าครั้งแรก** → ใส่รหัสพนักงาน ชื่อ และ PIN → ได้บัญชีหัวหน้าคนแรก
2. ไปที่แท็บ **ผู้ใช้ → นำเข้าข้อมูลจากแอปเดิม** → เลือกไฟล์ `msc-export.json` → **นำเข้าข้อมูล**
3. สร้างบัญชีให้ช่างแต่ละคนในแท็บ **ผู้ใช้** แล้วแจ้งรหัสพนักงานกับ PIN ให้ช่าง ช่างเปลี่ยน PIN เองได้จากปุ่ม **เปลี่ยน PIN**

## การดูแล

- **ช่างลาออก / ย้ายงาน:** แท็บผู้ใช้ → กดปิดใช้งาน บัญชีจะล็อกอินไม่ได้ทันที
- **ช่างลืม PIN:** ปิดใช้งานบัญชีเดิม → Firebase Console → Authentication → ลบผู้ใช้ที่มีอีเมล `<รหัสพนักงาน>@msc-users.app` → สร้างบัญชีใหม่ในแท็บผู้ใช้ด้วยรหัสพนักงานเดิม
- **ค่าใช้จ่าย:** แพ็กเกจฟรี (Spark) ของ Firebase รองรับการใช้งานระดับ machine shop ได้สบาย
