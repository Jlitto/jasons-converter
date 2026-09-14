# Jason's Converter

A cross-platform desktop application for batch converting JPEG images to PDF.

## Features

- 🖼️ **Batch Conversion**: Convert multiple JPEG images to a single PDF or multiple PDFs
- 🎨 **Drag & Drop**: Simply drag and drop your JPEG files into the application
- 📁 **File Management**: Easily add and remove files from the conversion queue
- 🚀 **Fast Processing**: Efficient image processing using Sharp and pdf-lib
- 💻 **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jlitto/jasons-converter.git
cd jasons-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development version:
```bash
npm start
```

Or build for production:
```bash
npm run build
```

## Usage

1. Launch the application
2. Drag and drop JPEG files into the drop zone, or click "Select Files"
3. Review the selected files
4. Click "Convert to PDF"
5. Your PDF will be saved in the same directory as your images

## Development

- **Start dev mode**: `npm run dev` (runs Electron and React dev server together)
- **Build for distribution**: `npm run build`
- **Build for macOS**: `npm run build-mac`
- **Build for Windows**: `npm run build-win`
- **Build for Linux**: `npm run build-linux`

## Technologies Used

- **Electron**: Cross-platform desktop application framework
- **React**: UI framework
- **pdf-lib**: PDF creation and manipulation
- **Sharp**: High-performance image processing

## License

MIT

## Author

Created for Jason's conversion needs! 🎉
