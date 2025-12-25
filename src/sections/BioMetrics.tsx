import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './BioMetrics.module.css';

interface BioMetricsProps {
    isOpen: boolean;
    onClose: () => void;
}

const BioMetrics = ({ isOpen, onClose }: BioMetricsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Animate container entry
            gsap.fromTo(containerRef.current,
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );

            // Stagger stats
            const stats = statsRef.current?.children;
            if (stats) {
                gsap.fromTo(stats,
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
                );
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.container} ref={containerRef}>
                <button className={styles.closeButton} onClick={onClose}>
                    [TERMINATE_DIAGNOSTIC]
                </button>

                {/* Left Panel: Statistics */}
                <div className={styles.statsPanel}>
                    <h2 className={styles.title}>System Diagnostics</h2>
                    <p className={styles.subtitle}>Bio-Physical Metrics // Live Feed</p>

                    <div className={styles.statGrid} ref={statsRef}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Bench Press (Chest)</span>
                            <span className={styles.statValue}>90 Kgs <span className={styles.statLimit}>x 3 Reps</span></span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Back Row</span>
                            <span className={styles.statValue}>120 Kgs <span className={styles.statLimit}>MAX</span></span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Squats (Legs)</span>
                            <span className={styles.statValue}>120 Kgs <span className={styles.statLimit}>STABLE</span></span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Endurance Run</span>
                            <span className={styles.statValue}>33 Kms <span className={styles.statLimit}>/ 4 HRS</span></span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Resting Heart Rate</span>
                            <span className={styles.statValue}>48 BPM <span className={styles.statLimit}>OPTIMAL</span></span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Body Fat</span>
                            <span className={styles.statValue}>8% <span className={styles.statLimit}>EST.</span></span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Body Visual */}
                <div className={styles.visualPanel}>
                    {/* Simple SVG Silhouette */}
                    <svg className={styles.bodySvg} viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
                        {/* Body Outline */}
                        <path d="M100 20 C 115 20, 125 30, 125 45 C 125 60, 115 70, 100 70 C 85 70, 75 60, 75 45 C 75 30, 85 20, 100 20 Z" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                        <path d="M75 70 L 40 90 L 30 180 L 45 180 L 55 100 L 75 90 L 75 180 L 100 180" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                        <path d="M125 70 L 160 90 L 170 180 L 155 180 L 145 100 L 125 90 L 125 180 L 100 180" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                        <path d="M75 180 L 75 250 L 60 380 L 90 380 L 95 250 L 100 250" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                        <path d="M125 180 L 125 250 L 140 380 L 110 380 L 105 250 L 100 250" fill="none" stroke="var(--accent-color)" strokeWidth="2" />

                        {/* Active Nodes (Chest, Legs, Back, Cardio) */}
                        <circle cx="100" cy="95" r="4" className={styles.node} /> {/* Chest */}
                        <circle cx="100" cy="120" r="4" className={styles.node} style={{ animationDelay: '0.5s' }} /> {/* Core/Back */}
                        <circle cx="85" cy="220" r="4" className={styles.node} style={{ animationDelay: '1s' }} /> {/* Leg L */}
                        <circle cx="115" cy="220" r="4" className={styles.node} style={{ animationDelay: '1.5s' }} /> {/* Leg R */}
                        <circle cx="100" cy="45" r="4" className={styles.node} style={{ animationDelay: '2s' }} /> {/* Head/Mental */}

                        {/* Connecting Lines */}
                        <line x1="100" y1="20" x2="100" y2="380" stroke="rgba(0, 255, 204, 0.2)" strokeDasharray="5,5" />
                        <line x1="20" y1="200" x2="180" y2="200" stroke="rgba(0, 255, 204, 0.2)" strokeDasharray="5,5" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BioMetrics;
