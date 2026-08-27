// ==== FUNGSI KIRIM & TAMPILKAN PESAN ====
 // Ambil elemen dari halaman HTML
 const inputPesan = document.getElementById('inputPesan');
 const daftarPesan = document.getElementById('daftarPesan');
 const namaPengguna = localStorage.getItem('namaPengguna') || 'Anonim';
 // Simpan nama pengguna
 function simpanNama() {
   const nama = document.getElementById('namaInput').value.trim();
   if (nama) {
     localStorage.setItem('namaPengguna', nama);
     location.reload();
   }
 }
 // Kirim pesan ke Firebase
 function kirimPesan() {
   const teks = inputPesan.value.trim();
   if (!teks) return;
   tambah(ref(db, 'pesan'), {
     nama: namaPengguna,
     teks: teks,
     waktu: new Date().toLocaleTimeString('id-ID')
   });
   inputPesan.value = '';
 }
 // Tampilkan pesan yang masuk
 onChildAdded(ref(db, 'pesan'), (snapshot) => {
   const data = snapshot.val();
   tampilkanPesan(data.nama, data.teks, data.waktu);
 });
 // Fungsi tampilkan pesan di layar
 function tampilkanPesan(nama, teks, waktu) {
   const div = document.createElement('div');
   div.style.cssText = 'margin: 8px 0; padding: 10px; background:#e3f2fd; border-radius:12px;';
   div.innerHTML = `
     <strong style="color:#1976d2">${nama}</strong>
     <span style="font-size:11px; color:#666; margin-left:8px">${waktu}</span>
     <p style="margin:5px 0 0 0; word-wrap:break-word">${teks}</p>
   `;
   daftarPesan.appendChild(div);
   daftarPesan.scrollTop = daftarPesan.scrollHeight;
}
