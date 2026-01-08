Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\romai\.gemini\antigravity\brain\4152858e-af99-4577-b3a5-b18ef573d5bf\logo_source_black_1767889104239.png"
$outputPath = "c:\Apps\tests\sites\romain_react\public\logo-rk-final.png"

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
$graphics = [System.Drawing.Graphics]::FromImage($newBmp)

# Iterate through pixels (this is slow in PS but fine for one image)
# Actually, iterating 1024x1024 in PS is too slow.
# Let's use ColorMatrix for faster processing if possible, or accept slow speed.
# Or better: Just use a lockbits approach if inline C# is allowed.
# Let's try inline C# for speed.

$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageProcessor {
    public static void Process(string inputFile, string outputFile) {
        using (Bitmap bmp = new Bitmap(inputFile)) {
            // 1. Make Transparent
            bmp.MakeTransparent(Color.Black);
            
            // 2. Crop (Find bounding box)
            int minX = bmp.Width, minY = bmp.Height, maxX = 0, maxY = 0;
            
            // Lock bits for speed
            BitmapData data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            unsafe {
                byte* ptr = (byte*)data.Scan0;
                for (int y = 0; y < bmp.Height; y++) {
                    for (int x = 0; x < bmp.Width; x++) {
                        // BGRA standard
                        byte b = ptr[0];
                        byte g = ptr[1];
                        byte r = ptr[2];
                        byte a = ptr[3];
                        
                        // If not transparent (and not black/dark)
                        // MakeTransparent handles pure black, but we might have near-black artifacts.
                        // Let's rely on MakeTransparent for strict black.
                        
                        if (a > 0) {
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }
                        ptr += 4;
                    }
                }
            }
            bmp.UnlockBits(data);
            
            if (minX > maxX) { minX = 0; maxX = bmp.Width - 1; minY = 0; maxY = bmp.Height - 1; } // Fallback
            
            // Padding
            minX = Math.Max(0, minX - 10);
            minY = Math.Max(0, minY - 10);
            maxX = Math.Min(bmp.Width - 1, maxX + 10);
            maxY = Math.Min(bmp.Height - 1, maxY + 10);
            
            Rectangle rect = new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
            using (Bitmap cropped = bmp.Clone(rect, bmp.PixelFormat)) {
                cropped.Save(outputFile, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

[ImageProcessor]::Process($inputPath, $outputPath)
Write-Host "Done"
