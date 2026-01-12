import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Generate the image
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: 'none',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    // Using a simple gradient via background clip text involves more complexity in satori
                    // simpler approach for favicon: text color with gradient simulation
                    // or just solid colors. Satori supports some linear gradients.
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    backgroundClip: 'text',
                    fontFamily: 'sans-serif', // Fallback
                }}
            >
                RK
            </div>
        ),
        {
            // ImageResponse options
            ...size,
        }
    );
}
