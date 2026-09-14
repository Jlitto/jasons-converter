const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertJpegsToPdf(imagePaths) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Process each image
    for (const imagePath of imagePaths) {
      // Read the image file
      const imageData = await fs.readFile(imagePath);

      // Embed the image in the PDF
      const image = await pdfDoc.embedJpg(imageData);

      // Get image dimensions
      const { width, height } = image;

      // Add a new page with the image dimensions
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }

    // Save the PDF
    const outputPath = path.join(
      path.dirname(imagePaths[0]),
      `converted_${Date.now()}.pdf`
    );
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);

    return `PDF created successfully at: ${outputPath}`;
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

module.exports = {
  convertJpegsToPdf,
};