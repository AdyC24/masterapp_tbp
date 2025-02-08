const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateContractPDF = (contract, filePath) => {
    const doc = new PDFDocument({ margin: 50 });

    // Pastikan direktori tempat menyimpan file ada
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

    // Register fonts
    doc.registerFont('Calibri', path.join(__dirname, '../../fonts', 'Calibri.ttf'));
    doc.registerFont('Calibri-Bold', path.join(__dirname, '../../fonts', 'Calibri-Bold.ttf'));
    doc.registerFont('TimesNewRoman-Bold', path.join(__dirname, '../../fonts', 'TimesNewRoman-Bold.ttf'));

    // Judul Dokumen
    doc.font('TimesNewRoman-Bold').fontSize(14).text('PERJANJIAN KERJA WAKTU TERTENTU', { align: 'center', underline: true });
    doc.font('Calibri-Bold').fontSize(10).text(`No: 087/HRD/PKWT I/TBP/III/2024`, { align: 'center' });
    doc.moveDown();
    doc.font('Calibri').fontSize(11).text(`Perjanjian ini dibuat di Desa Kawasi, pada hari Sabtu, 02 Maret 2024 oleh dan antara:`, { align: 'justify' });
    doc.moveDown();

    const tableData1 = [
        [1, 'Nama', ':', 'Rangga Aji Pratama'],
        ['', 'Jabatan', ':', 'HR & GA Manager'],
        ['', {
            text: 'Dalam hal ini bertindak untuk dan atas nama ',
            boldText: 'Trimegah Bangun Persada',
            normalText: '. Sebuah perusahaan yang bergerak di bidang pertambangan umum yang berkedudukan di Gedung Bank Panin Lt.2, Jl. Jenderal Sudirman Kav. 1, Kel. Gelora Kec, Tanah Abang, Kota Administrasi Jakarta Pusat dengan Kantor Perwakilannya yang beralamat di Jln. Kantor Camat RT 07/RW 04 Kel. Kalumata Puncak Kec. Kota Ternate Selatan, Propinsi Maluku Utara, untuk selanjutnya dalam Perjanjian ini disebut sebagai ',
            boldEnd: 'PIHAK PERTAMA.'
        }, '', '']
    ];
    
    // **Lebar kolom**
    const colWidths1 = [25, 130, 30, 320]; // Menyesuaikan proporsi tabel
    
    // **Posisi awal tabel**
    const startX1 = 50;
    let startY1 = doc.y;
    const rowHeight1 = 17;
    const padding1s = 5;
    
    // **Render tabel**
    tableData1.forEach((row, rowIndex) => {
        let rowHeightDynamic = rowHeight1;
        const y = startY1 + rowIndex * rowHeightDynamic;
    
        if (rowIndex < 2) {
            // **Baris Normal**
            row.forEach((cell, colIndex) => {
                const x = startX1 + colWidths1.slice(0, colIndex).reduce((a, b) => a + b, 0);
                doc.font('Calibri').fontSize(12).text(cell, x + padding1s, y + padding1s, { width: colWidths1[colIndex] - padding1s * 2 });
            });
        } else {
            // **Baris dengan teks panjang**
            const x2 = startX1 + colWidths1[0];
            const col2Width = colWidths1[1] + colWidths1[2] + colWidths1[3];
    
            const textHeight = doc.heightOfString(row[1].text + row[1].normalText, { width: col2Width - padding1s * 2 });
            rowHeightDynamic = Math.max(rowHeight1, textHeight + padding1s * 2);
    
            // **Tulis teks dengan format bold pada bagian tertentu**
            doc.font('Calibri').fontSize(12).text(row[1].text, x2 + padding1s, y + padding1s, { continued: true });
            doc.font('Calibri-Bold').text(row[1].boldText, { continued: true });
            doc.font('Calibri').text(row[1].normalText, { continued: true });
            doc.font('Calibri-Bold').text(row[1].boldEnd);
        }
    
        startY1 += rowHeightDynamic - rowHeight1;
    });
    
    doc.moveDown();

    // **Data tabel**
    const tableData2 = [
        [2, 'Nama', ':', 'Sikran Ulhaq'],
        ['', 'Jenis Kelamin', ':', 'Laki - Laki'],
        ['', 'Tempat, Tanggal Lahir', ':', 'Pekkabata, 18-Jul-95'],
        ['', 'Usia', ':', '29 Tahun'],
        ['', 'Alamat', ':', 'Jl. Lasinrang No 80. Rt 001/001, Kel. Pekkabata, Kec. Duampanua, Kab. Pinrang, Prov. Sulawesi Selatan'],
        ['', 'Status Pernikahan', ':', 'TK/0'],
        ['', 'No KTP', ':', '7315061807950004'],
        ['', {
            text: 'dalam hal ini bertindak untuk dan atas nama pribadi, untuk selanjutnya dalam Perjanjian ini disebut sebagai ',
            boldText: 'PIHAK KEDUA.',
        }, '', '']
    ];

    // **Lebar kolom**
    const colWidths = [25, 130, 30, 320]; 

    // **Posisi awal tabel**
    const startX = 50;
    let startY = doc.y;
    const padding = 5;

    // **Render tabel**
    tableData2.forEach((row, rowIndex) => {
        let rowHeightDynamic = 17; // Default tinggi row minimal

        // **Hitung tinggi teks tertinggi dalam satu baris**
        row.forEach((cell, colIndex) => {
            if (typeof cell === 'string' || typeof cell === 'number') {
                const textHeight = doc.heightOfString(cell, { width: colWidths[colIndex] - padding * 2 });
                rowHeightDynamic = Math.max(rowHeightDynamic, textHeight);
            }
        });

        // **Gambar teks dalam tabel**
        row.forEach((cell, colIndex) => {
            const x = startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);

            // **Jika cell berisi objek (teks + bold)**
            if (typeof cell === 'object' && cell !== null) {
                const combinedTextHeight = doc.heightOfString(cell.text + cell.boldText, { width: colWidths[colIndex] - padding * 2 });
                rowHeightDynamic = Math.max(rowHeightDynamic, combinedTextHeight);

                doc.font('Calibri').fontSize(12).text(cell.text, x + padding, startY + padding, { continued: true });
                doc.font('Calibri-Bold').text(cell.boldText);
            } else {
                doc.font('Calibri').fontSize(12).text(cell, x + padding, startY + padding, { width: colWidths[colIndex] - padding * 2 });
            }
        });

        // **Update posisi Y untuk baris berikutnya**
        startY += rowHeightDynamic;
    });


    // **Simpan PDF**
    doc.end();
};

module.exports = generateContractPDF;
