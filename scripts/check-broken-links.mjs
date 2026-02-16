
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const brokenLinks = [];
const checkedLinks = new Set();
const fileCache = new Set();

// Pre-populate file cache
function populateFileCache(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            populateFileCache(fullPath);
        } else {
            fileCache.add(fullPath);
        }
    }
}

function resolveLink(sourceFile, href) {
    // Ignore external links, anchors, and protocols
    if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return null; // External or special
    }

    let targetPath;
    if (href.startsWith('/')) {
        // Absolute path from root
        targetPath = path.join(DIST_DIR, href);
    } else {
        // Relative path
        const sourceDir = path.dirname(sourceFile);
        targetPath = path.resolve(sourceDir, href);
    }

    // Remove query params and hash
    targetPath = targetPath.split('?')[0].split('#')[0];

    // Check for existence
    if (fileCache.has(targetPath)) return true;
    
    // Try appending index.html if it's a directory (ends in / or no extension)
    if (fileCache.has(path.join(targetPath, 'index.html'))) return true;
    
    // Try appending .html
    if (fileCache.has(targetPath + '.html')) return true;

    // Last ditch: check if it matches a directory that has an index.html (Next.js trailing slash)
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory() && fileCache.has(path.join(targetPath, 'index.html'))) return true;

    return false;
}

function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = path.relative(DIST_DIR, filePath);
    
    // Regex to find hrefs
    const regex = /href=["']([^"']*)["']/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const href = match[1];
        
        // Skip if already known broken (optimization: normally we'd cache result, but simpler here)
        
        const status = resolveLink(filePath, href);
        if (status === false) {
            brokenLinks.push({
                source: relPath,
                link: href
            });
        }
    }
}

function traverseDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else if (file.endsWith('.html')) {
            scanFile(fullPath);
        }
    }
}

if (!fs.existsSync(DIST_DIR)) {
    console.error(`dist/ directory not found at ${DIST_DIR}`);
    process.exit(1);
}

console.log('Populating file cache...');
populateFileCache(DIST_DIR);
console.log(`Cache populated with ${fileCache.size} files.`);

console.log('Scanning for broken links...');
traverseDir(DIST_DIR);

console.log('\n--- BROKEN LINKS FOUND ---\n');
if (brokenLinks.length === 0) {
    console.log('No broken internal links found!');
} else {
    brokenLinks.forEach(item => {
        console.log(`[404] ${item.source} -> ${item.link}`);
    });
    console.log(`\nTotal broken links: ${brokenLinks.length}`);
    process.exit(1); // Fail the script
}
