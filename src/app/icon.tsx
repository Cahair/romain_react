import { ImageResponse } from 'next/og';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Monogramme RK et trait bleu, comme le logo de la marque.
export default function Icon() {
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
                    borderRadius: 6,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#e5e5e5',
                        letterSpacing: -1,
                        lineHeight: 1,
                        fontFamily: 'sans-serif',
                    }}
                >
                    RK
                </div>
                <div style={{ display: 'flex', width: 12, height: 2, marginTop: 3, background: '#3b82f6' }} />
            </div>
        ),
        {
            ...size,
        }
    );
}
