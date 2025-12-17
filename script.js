$(document).ready(function () {
    console.log("Website UMKM Siap!");
    
    // 1. FITUR HITUNG TOTAL
    $('#formHitung').on('submit', function (e) {
        e.preventDefault();
        
        // buat ambil nilai
        let harga = parseInt($('#hargaProduk').val());
        let jumlah = parseInt($('#jumlahProduk').val());

        if (isNaN(jumlah) || jumlah <= 0) {
            alert("Mohon masukkan jumlah porsi yang valid.");
        } else {
            let total = harga * jumlah;
            // buat tampilkan format rupiah
            $('#hasilTotal').text('Rp ' + total.toLocaleString('id-ID'));
            $('#hasilTotal').hide().fadeIn('slow'); 
        }
    });

    // 2. FITUR WISHLIST PRODUK
    // buat tombol tambahin produk
    $('#tambahBtn').on('click', function (e) {
        e.preventDefault(); // Mencegah form submit
        let namaProduk = $('#produkInput').val().trim();

        if (namaProduk !== "") {
            // buat list new item
            let newItem = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${namaProduk}
                    <span class="badge bg-secondary rounded-pill" style="cursor:pointer">Hapus (Klik 2x)</span>
                </li>
            `);
            
            // buat nambahin ke ul
            $('#daftarProduk').append(newItem);
            
            // bersihin input habis nambahin
            $('#produkInput').val(''); 
            $('#previewProduk').text('');
        }
    });

    // buat realtime preview
    $('#produkInput').on('keyup', function() {
        $('#previewProduk').text($(this).val());
    });

    // hapus item pake double click
    $('#daftarProduk').on('dblclick', 'li', function () {
        if (confirm("Yakin ingin menghapus produk ini dari wishlist?")) {
            $(this).fadeOut(300, function() { $(this).remove(); });
        }
    });
    
    // 3. FITUR GANTI TEMA (Halaman Produk)
    $('#temaSelect').on('change', function() {
        let warna = $(this).val();
        $('body').css('background-color', warna);
    });

    // 4. FITUR TESTIMONI (Looping Data)
    if ($('#testimoniContainer').length) {
        let testimoniData = [
            "Sambel ijonya pedes pol! Sangat direkomendasikan.",
            "Ayam geprek sambel bawang pedesnya pas.",
            "Sambal matahnya seger banget.",
            "Pelayanan melesat, harga merakyat.",
            "Ayamnya gede, sambelnya dermawan bet!"
        ];

        // Loop data array
        $.each(testimoniData, function(index, testimoni) {
            let htmlCard = `
                <div class="alert alert-light border shadow-sm mb-2">
                    <strong>Pelanggan ${index + 1}:</strong> 
                    <em class="text-muted">"${testimoni}"</em>
                </div>`;
            $('#testimoniContainer').append(htmlCard);
        });
    }

    // 5. FITUR KONTAK UMUM (buat validasi Sederhana)
    $('#formKontak').on('submit', function (e) {
        e.preventDefault();
        
        const nama = $('#nama').val();
        const email = $('#email').val();
        const pesan = $('#pesan').val();

        if (!nama || !email || !pesan) {
            alert("Harap isi semua kolom kontak.");
        } else {
            alert("Pesan Anda berhasil dikirim! (Simulasi)");
            this.reset();
        }
    });

    // 6. FITUR WEBINAR (Validasi Kompleks)
    $('#formWebinar').on('submit', function (event) {
        $('.error-msg').text('');
        let valid = true;

        // buat validasi nama
        let nama = $('#namaLengkap').val().trim();
        if (nama.length < 3) {
            $('#errorNamaLengkap').text("Nama minimal 3 karakter.");
            valid = false;
        }

        // buat validasi email
        let email = $('#emailWebinar').val().trim();
        let emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            $('#errorEmailWebinar').text("Format email salah.");
            valid = false;
        } else if (email.includes("@yahoo.com")) {
            $('#errorEmailWebinar').text("Maaf, email Yahoo tidak didukung.");
            valid = false;
        }

        // validasi no hp
        let hp = $('#noHP').val().trim();
        if (!/^[0-9]+$/.test(hp)) {
            $('#errorNoHP').text("No HP harus angka.");
            valid = false;
        }

        // validasi topik
        if ($('#topikWebinar').val() === "") {
            $('#errorTopikWebinar').text("Pilih salah satu topik.");
            valid = false;
        }

        // validasi snk
        if (!$('#setuju').is(':checked')) {
            $('#errorSetuju').text("Anda wajib menyetujui syarat & ketentuan.");
            valid = false;
        }

        // kalo gak valid brrti jangan submit, kalo valid submit dan reset
        if (!valid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            alert("Pendaftaran Webinar Berhasil!");
            this.reset();
        }
    });

    // 7. INTERAKSI TAMBAHAN (hover cursor)
    $('.card').hover(
        function() { $(this).addClass('shadow-lg').css('transition', '0.3s'); },
        function() { $(this).removeClass('shadow-lg'); }
    );

    // 8. FUNGSI CEK KATEGORI USIA (Global)
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
