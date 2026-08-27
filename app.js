// ==== CHAT FIREBASE ====
 const daftarPesan = document.getElementById('daftarPesan');
 const inputPesan = document.getElementById('inputPesan');
 // Ambil nama pengguna
 let namaPengguna = localStorage.getItem('namaPengguna');
 if (!namaPengguna) {
   namaPengguna = prompt('Masukkan nama kamu:');
   if (namaPengguna) {
     localStorage.setItem('namaPengguna', namaPengguna);
   } else {
     namaPengguna = 'Anonim';
   }
 }
 // Kirim pesan
 function kirimPesan() {
   const teks = inputPesan.value.trim();
   if (!teks) return;
   push(ref(db, 'pesan'), {
     nama: namaPengguna,
     teks: teks,
     waktu: new Date().toLocaleTimeString('id-ID')
   });
   inputPesan.value = '';
 }
 // Tampilkan pesan masuk
 onChildAdded(ref(db, 'pesan'), (snapshot) => {
   const data = snapshot.val();
   tambahPesanKeLayar(data.nama, data.teks, data.waktu);
 });
 function tambahPesanKeLayar(nama, teks, waktu) {
   const div = document.createElement('div');
   div.style.cssText = 'margin: 8px 0; padding: 12px; background:#e8f0fe; border-radius:12px;';
   div.innerHTML = `
     <strong style="color:#5865f2">${nama}</strong>
     <span style="font-size:11px; color:#888; margin-left:8px">${waktu}</span>
     <p style="margin:6px 0 0 0; word-wrap:break-word">${teks}</p>
   `;
   daftarPesan.appendChild(div);
   daftarPesan.scrollTop = daftarPesan.scrollHeight;
 }
