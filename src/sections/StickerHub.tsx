import { useRef, useState } from 'react';
import styles from './StickerHub.module.css';
import html2canvas from 'html2canvas';

interface StickerHubProps {
    isOpen: boolean;
    onClose: () => void;
}

const StickerHub = ({ isOpen, onClose }: StickerHubProps) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null); // New canvas for processing
    const [image, setImage] = useState<string | null>(null);
    const [outlineWidth, setOutlineWidth] = useState(5);
    const [smoothness, setSmoothness] = useState(0);
    const [tolerance, setTolerance] = useState(30);
    const [isMagicWandMode, setIsMagicWandMode] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgStr = event.target?.result as string;
                setImage(imgStr);

                // Load into canvas for editing
                const img = new Image();
                img.onload = () => {
                    if (canvasRef.current) {
                        canvasRef.current.width = img.width;
                        canvasRef.current.height = img.height;
                        const ctx = canvasRef.current.getContext('2d');
                        ctx?.drawImage(img, 0, 0);
                    }
                };
                img.src = imgStr;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isMagicWandMode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Get click coordinates adjusted for scale
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Get target color
        const targetIdx = (y * canvas.width + x) * 4;
        const targetR = data[targetIdx];
        const targetG = data[targetIdx + 1];
        const targetB = data[targetIdx + 2];

        // Simple threshold erase
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const diff = Math.sqrt(
                Math.pow(r - targetR, 2) +
                Math.pow(g - targetG, 2) +
                Math.pow(b - targetB, 2)
            );

            if (diff < tolerance) {
                data[i + 3] = 0; // Set alpha to 0
            }
        }

        ctx.putImageData(imageData, 0, 0);
        // Update image state to reflect changes (optional, but keeps preview in sync if we used img tag)
    };

    const handleDownload = async () => {
        if (!previewRef.current) return;
        try {
            const canvas = await html2canvas(previewRef.current, { backgroundColor: null, scale: 2 });
            const link = document.createElement('a');
            link.download = 'custom-sticker.png';
            link.href = canvas.toDataURL();
            link.click();
        } catch (err) { console.error(err); }
    };

    if (!isOpen) return null;

    // Dynamically calculate drop shadow for outline effect
    // Stacking multiple shadows creates a solid stroke
    const shadowColor = 'white';
    const w = outlineWidth;
    const filter = `
        drop-shadow(${w}px 0 0 ${shadowColor}) 
        drop-shadow(${-w}px 0 0 ${shadowColor}) 
        drop-shadow(0 ${w}px 0 ${shadowColor}) 
        drop-shadow(0 ${-w}px 0 ${shadowColor})
        drop-shadow(${w}px ${w}px 0 ${shadowColor}) 
        drop-shadow(${-w}px ${-w}px 0 ${shadowColor}) 
        drop-shadow(${w}px ${-w}px 0 ${shadowColor}) 
        drop-shadow(${-w}px ${w}px 0 ${shadowColor})
        contrast(${100 + smoothness}%)
    `;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>[CLOSE_STUDIO]</button>

                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        <h2 className={styles.title}>Sticker Hub</h2>

                        <div>
                            <span className={styles.label}>SOURCE PHOTO</span>
                            <label className={styles.fileLabel}>
                                UPLOAD RAW DATA
                                <input type="file" onChange={handleImageUpload} className={styles.fileInput} accept="image/*" />
                            </label>
                        </div>

                        {image && (
                            <div className={styles.controls}>
                                <div className={styles.rangeGroup}>
                                    <button
                                        onClick={() => setIsMagicWandMode(!isMagicWandMode)}
                                        style={{
                                            padding: '8px',
                                            background: isMagicWandMode ? 'var(--accent-color)' : '#333',
                                            color: isMagicWandMode ? '#000' : '#fff',
                                            border: '1px solid var(--accent-color)',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-mono)'
                                        }}
                                    >
                                        MAGIC WAND: {isMagicWandMode ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                {isMagicWandMode && (
                                    <div className={styles.rangeGroup}>
                                        <span className={styles.label}>COLOR TOLERANCE ({tolerance})</span>
                                        <input type="range" min="1" max="150" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className={styles.range} />
                                    </div>
                                )}
                                <div className={styles.rangeGroup}>
                                    <span className={styles.label}>OUTLINE THICKNESS ({outlineWidth}px)</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={outlineWidth}
                                        onChange={(e) => setOutlineWidth(Number(e.target.value))}
                                        className={styles.range}
                                    />
                                </div>
                                <div className={styles.rangeGroup}>
                                    <span className={styles.label}>CONTRAST ({smoothness}%)</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={smoothness}
                                        onChange={(e) => setSmoothness(Number(e.target.value))}
                                        className={styles.range}
                                    />
                                </div>
                            </div>
                        )}

                        <button className={styles.actionButton} onClick={handleDownload} disabled={!image} style={{ marginTop: 'auto' }}>
                            PRINT_STICKER.png
                        </button>
                    </div>

                    <div className={styles.main}>
                        {image ? (
                            <div ref={previewRef} style={{ display: 'inline-block', lineHeight: 0 }}>
                                <canvas
                                    ref={canvasRef}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '50vh',
                                        filter: filter,
                                        cursor: isMagicWandMode ? 'crosshair' : 'default'
                                    }}
                                    onClick={handleCanvasClick}
                                />
                            </div>
                        ) : (
                            <div style={{ color: '#444', fontFamily: 'var(--font-mono)' }}>
                                [NO DATA INPUT]
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickerHub;
