# Analisis Keamanan: Stateless vs Stateful Authentication

Pada aplikasi **FlavorDash** yang direncanakan untuk menangani jutaan pengguna, pemilihan arsitektur autentikasi sangatlah krusial. Dalam hal ini, kita menggunakan metode **Stateless Authentication** dengan **JWT (JSON Web Token)**.

Berikut adalah analisis komprehensif mengenai perbedaan Stateful dan Stateless, serta alasan teknis mengapa metode Stateless jauh lebih efisien untuk aplikasi berskala besar.

---

## 1. Perbedaan Mendasar: Stateful vs Stateless

### Stateful Authentication (Session-based)
Pada arsitektur Stateful, server bertanggung jawab penuh untuk "mengingat" status pengguna yang sedang *login*.
* **Alur Kerja:** 
  1. Pengguna login dengan username/password.
  2. Server membuat sebuah `Session ID` unik.
  3. Server **menyimpan Session ID tersebut di memori (RAM) atau database server** bersama dengan data user.
  4. Server mengirimkan Session ID tersebut ke perangkat *mobile* (client) melalui Cookie atau Response Body.
  5. Setiap kali client melakukan *request* ke server, client mengirimkan Session ID tersebut.
  6. Server harus mencocokkan Session ID dari client dengan yang ada di *database/memory* server.
* **Titik Lemah:** Server memiliki beban tambahan karena harus selalu menyimpan dan memeriksa Session ID di memori untuk setiap *request* yang masuk.

### Stateless Authentication (JWT-based)
Pada arsitektur Stateless, server **tidak menyimpan** data sesi apa pun (server tidak peduli siapa yang sedang *login* setelah token diberikan).
* **Alur Kerja:**
  1. Pengguna login dengan username/password.
  2. Server memvalidasi data dan membuat **JWT (JSON Web Token)**. JWT ini berisi data pengguna (seperti `user_id`, *roles*) dan di-enkripsi menggunakan sebuah kunci rahasia (*secret key*).
  3. Server mengirimkan JWT ke client.
  4. Client menyimpan JWT tersebut (di *SecureStore* pada aplikasi mobile).
  5. Pada setiap *request*, client melampirkan JWT di header HTTP (`Authorization: Bearer <token>`).
  6. Server hanya perlu "membongkar" (mendekode dan memverifikasi *signature*) token tersebut tanpa perlu mencari kecocokan di database. Jika *signature* valid, *request* diterima.

---

## 2. Anatomi JWT (JSON Web Token)
Untuk memahami bagaimana Stateless Authentication bekerja dengan aman, kita perlu mengetahui anatomi JWT yang terdiri dari tiga bagian utama, dipisahkan oleh titik (`.`): `Header.Payload.Signature`.

### A. Header
Header biasanya berisi dua informasi:
* **Tipe Token**: Yaitu JWT.
* **Algoritma Hashing**: Algoritma kriptografi yang digunakan untuk membuat *Signature*, misalnya HMAC SHA256 (HS256) atau RSA.

### B. Payload (Claims)
Payload berisi pernyataan (*claims*) atau data pengguna. Ada beberapa jenis *claims* seperti *registered* (standar seperti `iss` untuk issuer, `exp` untuk expiration), *public*, dan *private claims*.
* **Teknis Expiration (`exp`)**: JWT mengatur kedaluwarsa secara mandiri. *Payload* memuat timestamp `exp`. Saat server memvalidasi token, server akan mengecek apakah waktu saat ini telah melewati nilai `exp`. Jika ya, token otomatis ditolak tanpa harus mengecek database.
* **Peringatan Keamanan**: Walaupun aman dari manipulasi (berkat *Signature*), Payload **TIDAK DIENKRIPSI** (hanya di-encode menggunakan Base64Url). Artinya, siapa pun yang melihat token tersebut bisa membaca payload-nya. Oleh karena itu, **DILARANG KERAS** menyimpan kebocoran data sensitif (seperti password atau PIN) di dalam Payload.

### C. Signature
Ini adalah bagian terpenting untuk memastikan token tidak dimanipulasi di tengah jalan.
* **Teknis Signature**: Dibuat dengan mengambil *encoded* Header, *encoded* Payload, dan **Secret Key** (kunci rahasia yang hanya diketahui oleh server), lalu dilakukan proses hashing menggunakan algoritma yang ditentukan di Header.
* Jika peretas (*hacker*) mengubah sedikit saja isi Payload (misal mengubah `role: user` menjadi `role: admin`), *Signature* lama akan menjadi tidak valid karena peretas tidak memiliki *Secret Key* server untuk membuat *Signature* yang baru. Server akan langsung menolak token yang *signature*-nya cacat.

---

## 3. Mengapa Stateless (JWT) Lebih Efisien untuk Aplikasi Skala Besar (Jutaan Pengguna)?

Dalam konteks aplikasi mobile seperti FlavorDash yang menargetkan jutaan *users*, pendekatan Stateless sangat superior karena alasan teknis berikut:

### A. Beban Server Jauh Lebih Ringan (Memory Efficiency)
Pada Stateful (Session), bayangkan jika ada 5 juta pengguna yang *online* secara bersamaan; server harus menyiapkan RAM untuk menyimpan 5 juta data sesi aktif. Pada arsitektur Stateless (JWT), memori server yang digunakan untuk menyimpan sesi adalah **NOL**. Server hanya perlu melakukan operasi kriptografi (matematika) untuk mengecek validitas token setiap kali token itu datang. Ini sangat menghemat biaya infrastruktur server.

### B. Horizontal Scaling yang Sangat Mudah
Ketika aplikasi membesar, kita tidak bisa hanya menggunakan 1 server (kita butuh *Load Balancer* yang membagi beban ke Server A, Server B, dan Server C).
* Jika menggunakan **Session**, jika *User 1* login di Server A, data sesinya tersimpan di Server A. Jika *request* berikutnya dilempar ke Server B, Server B tidak akan mengenali *User 1* (kecuali kita membuat *Redis server* terpusat yang menambah latensi).
* Jika menggunakan **JWT**, *Load Balancer* bisa melempar *request* *User 1* ke server mana pun (A, B, atau C). Semua server dapat memvalidasi token tersebut karena mereka memiliki algoritma dan *secret key* yang sama.

### C. Kinerja API & Latensi Database (Speed)
Karena verifikasi JWT hanya mengandalkan perhitungan algoritma *signature* kriptografi murni di level aplikasi/backend, **tidak diperlukan lagi proses *query* ke database** setiap kali ada *request* masuk. Hal ini menghilangkan masalah *bottleneck* (kemacetan) pada I/O database, membuat *response time* API jauh lebih secepat kilat bagi *mobile app*.

### D. Keamanan Lintas-Domain (CORS) & Ekosistem Mobile
Aplikasi *mobile* React Native (atau iOS/Android native) tidak memiliki fitur manajemen *Cookie* otomatis seperti pada *Web Browser*. Mengirim JWT melalui `HTTP Header` sangat cocok dengan standar API *mobile* (RESTful/GraphQL API). JWT juga sangat aman selama disimpan dengan metode penguncian perangkat (*Keychain* di iOS dan *Keystore* di Android, yang kita abstraksikan menggunakan library `expo-secure-store`).

## Kesimpulan
Penggunaan Middleware dan Route Protection berbasis JWT pada folder `app/` (Expo Router) yang kita implementasikan adalah pondasi yang tepat. Metodologi **Stateless** mengamankan *endpoint* "Detail Pesanan" tanpa membebani performa server, sehingga menjamin aplikasi siap untuk bertumbuh dari ribuan menjadi jutaan pengguna secara mulus.
