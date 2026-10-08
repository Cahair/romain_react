import { ImageResponse } from 'next/og';

export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Même monogramme que icon.tsx, pour l'écran d'accueil iOS (iOS arrondit lui-même les coins).
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#171717',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 84,
                        fontWeight: 700,
                        color: '#e5e5e5',
                        letterSpacing: -4,
                        lineHeight: 1,
                        fontFamily: 'sans-serif',
                    }}
                >
                    RK
                </div>
                <div style={{ display: 'flex', width: 60, height: 9, marginTop: 12, background: '#3b82f6' }} />
            </div>
        ),
        {
            ...size,
        }
    );
}
