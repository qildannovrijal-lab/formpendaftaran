const form = document.getElementById("formPendaftaran");
const hasil = document.getElementById("hasil");

function resetError() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

function tampilkanHasil(data) {
  hasil.innerHTML = `
    <h2>Data Pendaftaran</h2>
    <p><b>Nama:</b> ${data.nama}</p>
    <p><b>NIM:</b> ${data.nim}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Telepon:</b> ${data.telepon}</p>
    <p><b>Tanggal Lahir:</b> ${data.tglLahir}</p>
    <p><b>Prodi:</b> ${data.prodi}</p>
    <p><b>Jenis Kelamin:</b> ${data.jk}</p>
    <p><b>Alamat:</b> ${data.alamat}</p>
  `;
  hasil.style.display = "block";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  resetError();

  let valid = true;

  const data = {
    nama: nama.value.trim(),
    nim: nim.value.trim(),
    email: email.value.trim(),
    telepon: telepon.value.trim(),
    tglLahir: tglLahir.value,
    prodi: prodi.value,
    jk: jk.value,
    alamat: alamat.value.trim()
  };

  if (!data.nama) {
    document.getElementById("err-nama").textContent = "Nama wajib diisi";
    valid = false;
  }

  if (!/^\d{8,10}$/.test(data.nim)) {
    document.getElementById("err-nim").textContent = "NIM harus 8–10 digit angka";
    valid = false;
  }

  if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    document.getElementById("err-email").textContent = "Email tidak valid";
    valid = false;
  }

  if (!/^08\d{8,11}$/.test(data.telepon)) {
    document.getElementById("err-telepon").textContent = "Format telepon salah";
    valid = false;
  }

  if (!data.tglLahir) {
    document.getElementById("err-tgl").textContent = "Tanggal lahir wajib diisi";
    valid = false;
  }

  if (!data.prodi) {
    document.getElementById("err-prodi").textContent = "Pilih program studi";
    valid = false;
  }

  if (!data.jk) {
    document.getElementById("err-jk").textContent = "Pilih jenis kelamin";
    valid = false;
  }

  if (!data.alamat) {
    document.getElementById("err-alamat").textContent = "Alamat wajib diisi";
    valid = false;
  }

  if (!valid) return;

  localStorage.setItem("pendaftaranTerakhir", JSON.stringify(data));
  tampilkanHasil(data);
  form.reset();
});

document.getElementById("btnReset").addEventListener("click", () => {
  form.reset();
  hasil.style.display = "none";
  hasil.innerHTML = "";
  localStorage.removeItem("pendaftaranTerakhir");
  resetError();
});

const saved = localStorage.getItem("pendaftaranTerakhir");
if (saved) tampilkanHasil(JSON.parse(saved));
