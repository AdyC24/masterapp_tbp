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

    // Judul Dokumen
    doc.font('Calibri-Bold').fontSize(14).text('PERJANJIAN KERJA WAKTU TERTENTU', { align: 'center', underline: true });
    doc.moveDown();
    doc.font('Calibri').fontSize(10).text(`No: ${contract.cgConcat}`, { align: 'center' });
    doc.moveDown();
    doc.font('Calibri').fontSize(11).text(`Perjanjian ini dibuat di Desa Kawasi, pada hari Sabtu, 02 Maret 2024 oleh dan antara:`, { align: 'justify' });
    doc.moveDown();

    const tableData = [
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
    const colWidths = [25, 130, 30, 320]; // Menyesuaikan proporsi tabel
    
    // **Posisi awal tabel**
    const startX = 50;
    let startY = doc.y;
    const rowHeight = 17;
    const padding = 5;
    
    // **Render tabel**
    tableData.forEach((row, rowIndex) => {
        let rowHeightDynamic = rowHeight;
        const y = startY + rowIndex * rowHeightDynamic;
    
        if (rowIndex < 2) {
            // **Baris Normal**
            row.forEach((cell, colIndex) => {
                const x = startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
                doc.font('Calibri').fontSize(12).text(cell, x + padding, y + padding, { width: colWidths[colIndex] - padding * 2 });
            });
        } else {
            // **Baris dengan teks panjang**
            const x2 = startX + colWidths[0];
            const col2Width = colWidths[1] + colWidths[2] + colWidths[3];
    
            const textHeight = doc.heightOfString(row[1].text + row[1].normalText, { width: col2Width - padding * 2 });
            rowHeightDynamic = Math.max(rowHeight, textHeight + padding * 2);
    
            // **Tulis teks dengan format bold pada bagian tertentu**
            doc.font('Calibri').fontSize(12).text(row[1].text, x2 + padding, y + padding, { continued: true });
            doc.font('Calibri-Bold').text(row[1].boldText, { continued: true });
            doc.font('Calibri').text(row[1].normalText, { continued: true });
            doc.font('Calibri-Bold').text(row[1].boldEnd);
        }
    
        startY += rowHeightDynamic - rowHeight;
    });
    
    // **Simpan PDF**
    doc.end();
};

module.exports = generateContractPDF;
