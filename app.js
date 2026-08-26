let namaSaya = "";
 function masuk() {
   const input = document.getElementById("namaPengguna").value.trim();
   if (input === "") { alert("Masukkan nama dulu!"); return; }
   namaSaya = input;
   document.getElementById("namaPenggunaTampil").textContent = namaSaya;
   document.getElementById("loginPage").classList.remove("active");
   document.getElementById("chatPage").classList.add("active");
 }
 function kirimPesan() {
   const input = document.getElementById("inputPesan");
   const teks = input.value.trim();
   if (teks === "") return;
   
   push(ref(db, "pesan"), {
     pengirim: namaSaya,
     teks: teks,
     waktu: Date.now()
   });
   input.value = "";
 }
 onChildAdded(ref(db, "pesan"), (data) => {
   const psn = data.val();
   const adalahSaya = psn.pengirim === namaSaya;
   tambahPesan(psn.pengirim, psn.teks, psn.waktu, adalahSaya);
 });
 function tambahPesan(pengirim, teks, waktu, adalahSaya) {
   const daftar = document.getElementById("daftarPesan");
   const jam = new Date(waktu).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
   const kotak = document.createElement("div");
   kotak.className = `pesan ${adalahSaya ? "saya" : "orang"}`;
   kotak.innerHTML = `<strong>${pengirim}</strong><p>${teks}</p><div class="waktu">${jam}</div>`;
   daftar.appendChild(kotak);
   daftar.scrollTop = daftar.scrollHeight;
 }
 function keluar() {
   if (confirm("Yakin keluar?")) {
     document.getElementById("chatPage").classList.remove("active");
     document.getElementById("loginPage").classList.add("active");
     document.getElementById("daftarPesan").innerHTML = "";
     document.getElementById("namaPengguna").value = "";
     namaSaya = "";
   }
 }