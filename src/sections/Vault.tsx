import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Vault.module.css';

interface VaultProps {
    isOpen: boolean;
    onClose: () => void;
}

const memes = [
    { id: 1, caption: 'Production on Friday', emoji: '🔥' },
    { id: 2, caption: 'It works on my machine', emoji: '💻' },
    { id: 3, caption: 'Git Push --force', emoji: '🚀' },
    { id: 4, caption: 'CSS Centering', emoji: '📐' },
    { id: 5, caption: 'Light Theme Users', emoji: '😎' },
    { id: 6, caption: 'Documentation?', emoji: '📚' },
    { id: 7, caption: 'Coffee dependency', emoji: '☕' },
    { id: 8, caption: 'Data Engineering', emoji: '🗄️' },
];

const Vault = ({ isOpen, onClose }: VaultProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(itemsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`${styles.vaultOverlay} ${isOpen ? styles.open : ''}`} ref={containerRef}>
            <div className={styles.warning}>TOP SECRET</div>

            <div className={styles.header}>
                <h2 className={styles.title}>The Vault // Classified</h2>
                <button className={styles.closeButton} onClick={onClose}>
                    [CLOSE_CONNECTION]
                </button>
            </div>

            <div className={styles.grid}>
                {memes.map((meme, index) => (
                    <div
                        key={meme.id}
                        className={styles.item}
                        ref={el => { itemsRef.current[index] = el; }}
                    >
                        <div className={styles.imagePlaceholder}>
                            {meme.emoji}
                        </div>
                        <div className={styles.caption}>
                            FILE_0{meme.id}: {meme.caption}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vault;
