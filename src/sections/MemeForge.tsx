import { useRef, useState, useEffect } from 'react';
import styles from './MemeForge.module.css';

interface MemeForgeProps {
    isOpen: boolean;
    onClose: () => void;
}

const MemeForge = ({ isOpen, onClose }: MemeForgeProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationsLeft, setGenerationsLeft] = useState(3);

    // Load rate limit state
    useEffect(() => {
        const today = new Date().toDateString();
        const saved = localStorage.getItem('meme_gen_limit');
        if (saved) {
            const { date, count } = JSON.parse(saved);
            if (date === today) {
                setGenerationsLeft(count);
            } else {
                // Reset for new day
                localStorage.setItem('meme_gen_limit', JSON.stringify({ date: today, count: 3 }));
                setGenerationsLeft(3);
            }
        } else {
            localStorage.setItem('meme_gen_limit', JSON.stringify({ date: today, count: 3 }));
        }
    }, []);

    // Load default image on mount
    useEffect(() => {
        const img = new Image();
        img.src = 'https://i.imgflip.com/1g8my4.jpg'; // Placeholder "Two Buttons" meme
        img.crossOrigin = 'anonymous';
        img.onload = () => setImage(img);
    }, []);

    // Draw canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to match image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw Image
        ctx.drawImage(image, 0, 0);

        // Text Config
        ctx.font = `bold ${image.width / 10}px Impact`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = image.width / 150;
        ctx.textAlign = 'center';

        // Draw Top Text
        if (topText) {
            ctx.textBaseline = 'top';
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
        }

        // Draw Bottom Text
        if (bottomText) {
            ctx.textBaseline = 'bottom';
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        }

    }, [image, topText, bottomText, isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => setImage(img);
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAIGenerate = () => {
        if (generationsLeft <= 0) {
            alert('DAILY_LIMIT_REACHED. TRY_AGAIN_TOMORROW.');
            return;
        }

        setIsGenerating(true);
        // Simulate AI Delay
        setTimeout(() => {
            const aiCaptions = [
                { top: "WHEN THE CODE", bottom: "COMPILES FIRST TRY" },
                { top: "DEPLOYING TO PROD", bottom: "ON A FRIDAY" },
                { top: "IT'S NOT A BUG", bottom: "IT'S A FEATURE" },
                { top: "MY CODE DOESN'T WORK", bottom: "I HAVE NO IDEA WHY" },
                { top: "AI WILL TAKE OUR JOBS", bottom: "AI CAN'T CENTER A DIV" }
            ];
            const random = aiCaptions[Math.floor(Math.random() * aiCaptions.length)];

            setTopText(random.top);
            setBottomText(random.bottom);

            // Update Limit
            const newCount = generationsLeft - 1;
            setGenerationsLeft(newCount);
            localStorage.setItem('meme_gen_limit', JSON.stringify({
                date: new Date().toDateString(),
                count: newCount
            }));

            setIsGenerating(false);
        }, 1500);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'meme-forge-export.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const TEMPLATES = [
        { name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
        { name: 'Drake Hotline', url: 'https://i.imgflip.com/30b1gx.jpg' },
        { name: 'Distracted BF', url: 'https://i.imgflip.com/1ur9b0.jpg' },
        { name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' },
        { name: 'Exit Ramp', url: 'https://i.imgflip.com/22bdq6.jpg' }
    ];

    const handleTemplateSelect = (url: string) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        img.onload = () => setImage(img);
    };

    if (!isOpen) return null;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>
                    [ABORT_FORGE]
                </button>

                <div className={styles.sidebar}>
                    <h2 className={styles.title}>Meme Forge</h2>

                    <div style={{ padding: '10px', background: 'rgba(0, 255, 204, 0.1)', border: '1px solid var(--accent-color)', marginBottom: '20px' }}>
                        <span className={styles.label} style={{ color: 'var(--accent-color)' }}>AI STATUS: ONLINE</span>
                        <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '5px' }}>
                            Running GPT-4 (Simulated).<br />
                            Daily Credits: {generationsLeft}/3
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <span className={styles.label}>SELECT TEMPLATE</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', marginTop: '5px' }}>
                            {TEMPLATES.map(t => (
                                <img
                                    key={t.name}
                                    src={t.url}
                                    alt={t.name}
                                    title={t.name}
                                    style={{ width: '100%', height: '40px', objectFit: 'cover', cursor: 'pointer', border: '1px solid #444' }}
                                    onClick={() => handleTemplateSelect(t.url)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className={styles.label}>OR UPLOAD SOURCE</span>
                        <label className={styles.fileLabel}>
                            UPLOAD FILE
                            <input type="file" onChange={handleImageUpload} className={styles.fileInput} accept="image/*" />
                        </label>
                    </div>

                    <button
                        className={styles.actionButton}
                        onClick={handleAIGenerate}
                        disabled={isGenerating || generationsLeft === 0}
                        style={{ background: isGenerating ? '#333' : '#ff00ff', color: '#fff', marginBottom: '20px' }}
                    >
                        {isGenerating ? 'GENERATING...' : 'AI AUTO-GENERATE'}
                    </button>

                    <div>
                        <span className={styles.label}>TOP TEXT</span>
                        <input
                            className={styles.input}
                            value={topText}
                            onChange={e => setTopText(e.target.value)}
                            placeholder="HELLO WORLD"
                        />
                    </div>

                    <div>
                        <span className={styles.label}>BOTTOM TEXT</span>
                        <input
                            className={styles.input}
                            value={bottomText}
                            onChange={e => setBottomText(e.target.value)}
                            placeholder="BOTTOM TEXT"
                        />
                    </div>

                    <p className={styles.label} style={{ marginTop: 'auto', fontSize: '0.7rem' }}>
                        * Images processed locally in browser memory.
                    </p>

                    <button className={styles.actionButton} onClick={handleDownload}>
                        EXPORT_ARTIFACT.png
                    </button>
                </div>

                <div className={styles.main}>
                    <div className={styles.canvasContainer}>
                        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeForge;
