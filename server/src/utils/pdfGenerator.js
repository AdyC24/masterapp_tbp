const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Function to convert image to base64
const imageToBase64 = (filePath) => {
    const file = fs.readFileSync(filePath);
    return `data:image/png;base64,${file.toString('base64')}`;
};

const generateContractPDF = async (contract, filePath) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML template
    const htmlContent = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Convert image to base64
    const imagePath = path.join(__dirname, 'images/HeaderTBP.png');
    const imageBase64 = imageToBase64(imagePath);
    console.log(`Image base64: ${imageBase64.substring(0, 30)}...`); // Log the first 30 characters of the base64 string

    // Define header template with base64 image
    const headerTemplate = `
        <div style="width: 100%; text-align: center; font-size: 10px; padding: 10px 0;">
            <img src="${imageBase64}" style="width: 750px; height: auto;" />
        </div>
    `;

    // Define footer template with a line above and two small columns in the right corner
    const footerTemplate = `
        <div style="width: 100%; text-align: center; font-size: 10px; padding: 10px 0; position: relative;">
            <hr style="border: none; border-style: double; border-top: 1px solid #000; width: 80%; margin-bottom: 5px;">
            <span style="position: relative; z-index: 2;">Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span></span>
            <div style="position: absolute; right: 80px; top: 20px; display: flex; z-index: 1;">
                <table style="border-collapse: collapse; width: 100%; font-size: 6px;">
                    <tr>
                        <td style="border: 1px solid #000; height: 20px; width: 30px;"></td>
                        <td style="border: 1px solid #000; height: 20px; width: 30px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; font-size: 6px;">Pekerja</td>
                        <td style="border: 1px solid #000; font-size: 6px;">Perusahaan</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    // Generate PDF with header and footer
    await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: headerTemplate,
        footerTemplate: footerTemplate,
        margin: {
            top: '135px', // Adjust top margin to accommodate header
            right: '50px',
            bottom: '50px',
            left: '50px'
        }
    });

    await browser.close();
};

module.exports = generateContractPDF;
