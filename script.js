$(document).ready(function () {
    console.log("Website UMKM Siap!");

    // ==========================================
    // 1. FITUR HITUNG TOTAL (Halaman Produk)
    // ==========================================
    $('#formHitung').on('submit', function (e) {
        e.preventDefault();
        
        // Ambil nilai
        let harga = parseInt($('#hargaProduk').val());
        let jumlah = parseInt($('#jumlahProduk').val());

        if (isNaN(jumlah) || jumlah <= 0) {
            alert("Mohon masukkan jumlah porsi yang valid.");
        } else {
            let total = harga * jumlah;
            // Tampilkan dengan format mata uang
            $('#hasilTotal').text('Rp ' + total.toLocaleString('id-ID'));
            // Efek animasi fadeIn
            $('#hasilTotal').hide().fadeIn('slow'); 
        }
    });

    // ==========================================
    // 2. FITUR WISHLIST PRODUK (Halaman Produk)
    // ==========================================
    // Event Klik Tombol Tambah
    $('#tambahBtn').on('click', function (e) {
        e.preventDefault(); // Mencegah form submit
        let namaProduk = $('#produkInput').val().trim();

        if (namaProduk !== "") {
            // Membuat elemen LI baru dengan class Bootstrap
            let newItem = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${namaProduk}
                    <span class="badge bg-secondary rounded-pill" style="cursor:pointer">Hapus (Klik 2x)</span>
                </li>
            `);
            
            // Tambahkan ke UL
            $('#daftarProduk').append(newItem);
            
            // Bersihkan input
            $('#produkInput').val(''); 
            $('#previewProduk').text('');
        }
    });

    // Event Realtime Preview (KeyUp)
    $('#produkInput').on('keyup', function() {
        $('#previewProduk').text($(this).val());
    });

    // Event Hapus Item (Double Click) - Menggunakan Event Delegation
    $('#daftarProduk').on('dblclick', 'li', function () {
        if (confirm("Yakin ingin menghapus produk ini dari wishlist?")) {
            $(this).fadeOut(300, function() { $(this).remove(); });
        }
    });

    // ==========================================
    // 3. FITUR GANTI TEMA (Halaman Produk)
    // ==========================================
    $('#temaSelect').on('change', function() {
        let warna = $(this).val();
        $('body').css('background-color', warna);
    });

    // ==========================================
    // 4. FITUR TESTIMONI (Looping Data)
    // ==========================================
    if ($('#testimoniContainer').length) {
        let testimoniData = [
            "Sambel ijonya pedes pol! Sangat direkomendasikan.",
            "Ayam geprek sambel bawang pedesnya pas.",
            "Sambal matahnya seger banget.",
            "Pelayanan cepat, harga mahasiswa.",
            "Ayamnya gede, sambelnya banyak!"
        ];

        // Loop data array menggunakan jQuery $.each
        $.each(testimoniData, function(index, testimoni) {
            let htmlCard = `
                <div class="alert alert-light border shadow-sm mb-2">
                    <strong>Pelanggan ${index + 1}:</strong> 
                    <em class="text-muted">"${testimoni}"</em>
                </div>`;
            $('#testimoniContainer').append(htmlCard);
        });
    }

    // ==========================================
    // 5. FITUR KONTAK UMUM (Validasi Sederhana)
    // ==========================================
    $('#formKontak').on('submit', function (e) {
        e.preventDefault();
        
        // Ambil value dengan jQuery .val()
        const nama = $('#nama').val();
        const email = $('#email').val();
        const pesan = $('#pesan').val();

        if (!nama || !email || !pesan) {
            alert("Harap isi semua kolom kontak.");
        } else {
            alert("Pesan Anda berhasil dikirim! (Simulasi)");
            this.reset(); // Reset form
        }
    });

    // ==========================================
    // 6. FITUR WEBINAR (Validasi Kompleks)
    // ==========================================
    $('#formWebinar').on('submit', function (event) {
        // Reset pesan error dulu
        $('.error-msg').text('');
        let valid = true;

        // Validasi Nama
        let nama = $('#namaLengkap').val().trim();
        if (nama.length < 3) {
            $('#errorNamaLengkap').text("Nama minimal 3 karakter.");
            valid = false;
        }

        // Validasi Email (Regex sederhana & cek yahoo)
        let email = $('#emailWebinar').val().trim();
        let emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            $('#errorEmailWebinar').text("Format email salah.");
            valid = false;
        } else if (email.includes("@yahoo.com")) {
            $('#errorEmailWebinar').text("Maaf, email Yahoo tidak didukung.");
            valid = false;
        }

        // Validasi No HP (Angka saja)
        let hp = $('#noHP').val().trim();
        if (!/^[0-9]+$/.test(hp)) {
            $('#errorNoHP').text("No HP harus angka.");
            valid = false;
        }

        // Validasi Topik
        if ($('#topikWebinar').val() === "") {
            $('#errorTopikWebinar').text("Pilih salah satu topik.");
            valid = false;
        }

        // Validasi Checkbox
        if (!$('#setuju').is(':checked')) {
            $('#errorSetuju').text("Anda wajib menyetujui syarat & ketentuan.");
            valid = false;
        }

        // Jika tidak valid, stop submit
        if (!valid) {
            event.preventDefault();
        } else {
            event.preventDefault(); // Stop reload agar bisa alert
            alert("Pendaftaran Webinar Berhasil!");
            this.reset(); // Reset form webinar
        }
    });

    // ==========================================
    // 7. INTERAKSI TAMBAHAN (Hover Card)
    // ==========================================
    $('.card').hover(
        function() { $(this).addClass('shadow-lg').css('transition', '0.3s'); }, // Mouse enter
        function() { $(this).removeClass('shadow-lg'); } // Mouse leave
    );

    // ==========================================
    // 8. FUNGSI CEK KATEGORI USIA (Global)
    // ==========================================
    // Dibuat window.cekKategori agar bisa dipanggil onclick di HTML jika perlu,
    // Tapi lebih baik pakai event listener seperti di bawah:
    $('#btnCekUsia').on('click', function() {
        let usia = parseInt($('#usiaInput').val());
        let status = "";

        if (usia < 13) status = "Anak-anak";
        else if (usia >= 13 && usia <= 17) status = "Remaja";
        else if (usia >= 18 && usia <= 60) status = "Dewasa";
        else if (usia > 60) status = "Lansia";
        else status = "Usia tidak valid.";

        $('#statusKategori').text(status);
    });
});