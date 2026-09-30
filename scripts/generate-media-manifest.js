import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const outputManifestPath = path.join(rootDir, 'src', 'data', 'mediaManifest.json');
const configFile = path.join(rootDir, 'media.config.json');

// Supported extensions
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const UNSUPPORTED_EXTS = new Set(['.heic', '.heif', '.tiff', '.bmp', '.raw']);

// Ignored files and patterns
const IGNORE_PATTERNS = [
  /favicon/i,
  /apple-touch-icon/i,
  /vite\.svg/i,
  /og-image/i,
  /icon-/i,
  /placeholder-\d+\.svg$/i, // Skip auto-generated fallback SVGs
  /\.DS_Store$/
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function run() {
  console.log('🔍 Scanning public directory for photos...');

  let userConfig = {};
  if (fs.existsSync(configFile)) {
    try {
      userConfig = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
      console.log('📄 Found media.config.json configuration file.');
    } catch (e) {
      console.warn('⚠️ Could not parse media.config.json:', e.message);
    }
  }

  const allFiles = getAllFiles(publicDir);
  const discoveredPhotos = [];
  const unsupportedFiles = [];

  allFiles.forEach((filePath) => {
    const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
    const ext = path.extname(filePath).toLowerCase();

    // Check ignore patterns
    if (IGNORE_PATTERNS.some((pattern) => pattern.test(relPath))) {
      return;
    }

    if (SUPPORTED_EXTS.has(ext)) {
      discoveredPhotos.push(relPath);
    } else if (UNSUPPORTED_EXTS.has(ext)) {
      unsupportedFiles.push({
        path: relPath,
        ext: ext,
        message: `Format ${ext.toUpperCase()} is not directly web-supported. Please convert to JPG, PNG, or WebP.`
      });
    }
  });

  if (unsupportedFiles.length > 0) {
    console.warn(`⚠️ Found ${unsupportedFiles.length} unsupported photo(s):`);
    unsupportedFiles.forEach((u) => console.warn(`   - ${u.path}: ${u.message}`));
  }

  // Natural numerical sort (Image1.jpeg, Image2.jpeg, Image10.jpeg...)
  discoveredPhotos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  // Read explicit ordering or configuration
  const customOrder = userConfig.order || [];
  const customMetadata = userConfig.photos || {};

  let finalPhotoPaths = [...discoveredPhotos];

  if (customOrder.length > 0) {
    const ordered = [];
    const remaining = new Set(discoveredPhotos);

    customOrder.forEach((p) => {
      if (remaining.has(p)) {
        ordered.push(p);
        remaining.delete(p);
      }
    });
    finalPhotoPaths = [...ordered, ...Array.from(remaining)];
  }

  // Build photo objects
  let photos = finalPhotoPaths.map((relPath, idx) => {
    const meta = customMetadata[relPath] || {};
    const encodedPath = relPath.split('/').map(encodeURIComponent).join('/');
    const src = '/' + encodedPath;

    return {
      id: `photo-${idx + 1}`,
      rawPath: relPath,
      src: src,
      alt: meta.alt || `Reyansh photo ${idx + 1}`,
      caption: meta.caption || `Precious moment with Reyansh #${idx + 1}`,
      objectPosition: meta.objectPosition || 'center center',
      isPlaceholder: false,
      width: meta.width || 800,
      height: meta.height || 1000
    };
  });

  console.log(`📸 Discovered ${photos.length} real user photo(s)!`);

  const manifestData = {
    generatedAt: new Date().toISOString(),
    totalPhotos: photos.length,
    realPhotosCount: discoveredPhotos.length,
    unsupportedFiles: unsupportedFiles,
    photos: photos
  };

  const dataDir = path.dirname(outputManifestPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputManifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`✨ Generated media manifest at ${outputManifestPath} with ${photos.length} photos!`);
}

run();
