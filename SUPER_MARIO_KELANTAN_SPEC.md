# Super Mario Evolution 2: Edisi Kelantan
## Web 1-1 Clone — Spesifikasi Projek

> Dokumen rujukan projek. Kod sumber utama semasa kekal dalam `index.html`.

## 1. Konsep dan Reskin Tema Kelantan

| Entiti Asal | Penyesuaian Tema Kelantan | Peranan Mekanik |
|---|---|---|
| Mario | Abe Yo | Small → Abe Saso → Abe Bisa |
| Mushroom | Nasi Kerabu (`M`) | Small Mario menjadi lebih tinggi, daripada 15px kepada 22px |
| Fire Flower | Cili Solok / Cili Melaka (`F`) | Memberi kuasa menembak biji cili menggunakan `Z` atau `J` |
| Starman | Semutar Emas Tok Dalang (`S`) | Kebal selama 10 saat dengan palet Merah-Putih berkilat |
| Goomba | Kera Duku / Beruk | Musuh darat; boleh dipijak dari atas |
| Warp Pipe | Tempayan Budu (`P`) | Halangan pepejal coklat gelap, maksimum 2–3 blok tinggi |
| Flagpole | Tiang Wau Bulan (`L`) | Penamat level dan markah bonus |

## 2. Parameter Fizik dan Platform

- Canvas native: `256 × 240px`.
- CSS scale sasaran: `768 × 720px`.
- Rendering: `image-rendering: pixelated`.
- Game loop: `requestAnimationFrame`, sasaran 60 FPS.
- Graviti: `0.28px/frame²`.
- Terminal velocity: `7px/frame`.
- Halaju lompatan: `-6.2px/frame`.
- Kamera: bergerak ke kanan mengikut Abe Yo dan tidak berundur ke kiri.
- Lubang dan ketinggian tempayan dikalibrasi supaya boleh dilalui dengan jarak lompatan maksimum.

## 3. Status Pemain

| Status | Maksud |
|---|---|
| `0` | Abe Kecik / Small Mario |
| `1` | Abe Saso / Super Mario |
| `2` | Abe Bisa / Fire Mario |

### Perlindungan kecederaan

- Abe Saso atau Abe Bisa terkena musuh: turun kepada Abe Kecik, bukan mati terus.
- Tempoh kebal selepas mengecil: 120 frame / kira-kira 2 saat.
- Abe Kecik terkena musuh atau jatuh gaung: `dead = true`.
- Semutar Emas mengatasi kerosakan selama 600 frame / 10 saat.

## 4. Kawalan

- Bergerak kiri/kanan: `A` / `D` atau `ArrowLeft` / `ArrowRight`.
- Lompat: `Space`, `W`, atau `ArrowUp`.
- Sprint: tahan `ShiftLeft`.
- Tembak cili: `Z` atau `J`, hanya ketika Abe Bisa.
- Mula semula selepas kalah/menang: `R`.

## 5. Mekanik Item

### Nasi Kerabu (`M`)

Menukar Abe Kecik kepada Abe Saso dan menaikkan tinggi hitbox daripada 15px kepada 22px.

### Cili Solok (`F`)

Menukar Abe Yo kepada Abe Bisa. Abe Bisa boleh menembak projectile cili. Maksimum dua projectile pada satu masa.

### Semutar Emas (`S`)

Mengaktifkan mod kebal selama 10 saat. Sentuhan dengan musuh menghapuskan musuh tersebut.

## 6. Musuh

Kera Duku / Beruk bergerak secara patrol kiri-kanan. Musuh:

- Boleh dipijak dari atas.
- Memberi damage apabila dirempuh dari sisi atau bawah.
- Dihapuskan oleh projectile cili.
- Dihapuskan apabila disentuh ketika mod Semutar Emas aktif.

## 7. Level dan Tilemap

- `.` = langit / udara.
- `#` = tanah atau bata.
- `M` = Nasi Kerabu.
- `F` = Cili Solok.
- `S` = Semutar Emas.
- `P` = Tempayan Budu.
- `L` = Tiang Wau Bulan.

## 8. HUD dan Bahasa

HUD perlu memaparkan:

- `STATUS`: Abe Kecik, Abe Saso atau Abe Bisa.
- `MARKAH`.
- `KEBAL`: kira detik Semutar Emas atau `DOK BISA`.

## 9. Nota Kod

Kod dalam spesifikasi asal yang disalin melalui chat mempunyai beberapa token rosak akibat formatting, contohnya operator logik `||` yang berubah menjadi teks, nama pemboleh ubah yang terpotong, dan interpolation template literal yang hilang. Oleh itu, spesifikasi ini disimpan sebagai rujukan reka bentuk; `index.html` perlu dibina menggunakan JavaScript yang telah disahkan sintaksnya.

## 10. Acceptance Criteria

- Game berjalan dalam satu fail `index.html` tanpa dependency luar.
- Game boleh dimainkan dalam browser moden dan iPad Safari.
- Abe Yo, Kera Duku/Beruk, Tempayan Budu, bata, power-up dan Tiang Wau Bulan mempunyai visual tersendiri.
- Semua kuasa utama boleh diuji dalam satu sesi.
- Restart `R` berfungsi selepas keadaan kalah atau menang.
- Tiada runtime JavaScript error ketika game loop berjalan.
