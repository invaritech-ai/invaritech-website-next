#!/bin/bash

# Image optimization script using sips (macOS built-in tool)
# This script compresses PNG and JPG images in the public folder

echo "Starting image optimization..."

# Function to optimize PNG images
optimize_png() {
    local file=$1
    local temp_file="${file}.tmp"
    
    # Use sips to convert and compress PNG
    # sips -s format jpeg -s formatOptions 70 "$file" --out "$temp_file" 2>/dev/null
    # For PNG, we'll use sips to resample/resize if needed, then use pngquant if available
    
    # Check file size
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc)
    
    echo "  Processing: $(basename $file) - ${size_mb}MB"
    
    # For very large images, we can resize them
    if [ $size -gt 500000 ]; then
        # Get image dimensions
        width=$(sips -g pixelWidth "$file" | grep pixelWidth | awk '{print $2}')
        height=$(sips -g pixelHeight "$file" | grep pixelHeight | awk '{print $2}')
        
        # If image is very large, resize it (max 2000px on longest side)
        if [ $width -gt 2000 ] || [ $height -gt 2000 ]; then
            echo "    Resizing large image..."
            sips -Z 2000 "$file" --out "$temp_file" > /dev/null 2>&1
            if [ -f "$temp_file" ]; then
                mv "$temp_file" "$file"
                echo "    Resized successfully"
            fi
        fi
    fi
}

# Function to optimize JPG images
optimize_jpg() {
    local file=$1
    local temp_file="${file}.tmp"
    
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc)
    
    echo "  Processing: $(basename $file) - ${size_mb}MB"
    
    # Compress JPG with sips (quality 80)
    sips -s format jpeg -s formatOptions 80 "$file" --out "$temp_file" > /dev/null 2>&1
    if [ -f "$temp_file" ]; then
        mv "$temp_file" "$file"
        new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        new_size_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc)
        echo "    Compressed to ${new_size_mb}MB"
    fi
}

# Process PNG files
echo "Optimizing PNG files..."
find public -type f -iname "*.png" | while read file; do
    optimize_png "$file"
done

# Process JPG files
echo "Optimizing JPG files..."
find public -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read file; do
    optimize_jpg "$file"
done

echo "Image optimization complete!"
echo ""
echo "Note: For best results, consider using specialized tools like:"
echo "  - ImageOptim (macOS app (macOS)"
echo "  - Squoosh (web-based)"
echo "  - pngquant (for PNG)"
echo "  - jpegoptim (for JPG)"

