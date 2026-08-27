// ==== FUNGSI MASUK OBROLAN ====
 function masukObrolan() {
   const nama = document.getElementById('namaInput').value.trim();
   if (!nama) {
     alert('Masukkan nama dulu!');
     return;
   }
   localStorage.setItem('namaPengguna', nama);
   document.getElementById('halamanMasuk').style.display = 'none';
   document.getElementById('halamanChat').style.display = 'block';
 }
 // ==== FUNGSI KIRIM PESAN ====
 function kirimPesan() {
   const nama = localStorage.getItem('namaPengguna') || 'Anonim';
   const teks = document.getElementById('inputPesan').value.trim();
   if (!teks) return;
   push(ref(db, 'pesan'), {
     nama: nama,
     teks: teks,
     waktu: new Date().toLocaleTimeString('id-ID')
   });
   document.getElementById('inputPesan').value = '';
 }
 // ==== TAMPILKAN PESAN MASUK ====
 onChildAdded(ref(db, 'pesan'), (snapshot) => {
   const data = snapshot.val();
   tampilkanPesan(data.nama, data.teks, data.waktu);
 });
 // ==== TAMBAH PESAN KE LAYAR ====
 function tampilkanPesan(nama, teks, waktu) {
   const div = document.createElement('div');
   div.className = 'pesan';
   div.innerHTML = `
     <span class="nama">${nama}</span>
     <span class="waktu">${waktu}</span>
     <p style="margin:8px 0 0 0;">${teks}</p>
   `;
   document.getElementById('daftarPesan').appendChild(div);
   document.getElementById('daftarPesan').scrollTop = document.getElementById('daftarPesan').scrollHeight;
 }
