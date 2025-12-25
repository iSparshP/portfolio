import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(containerRef.current, { opacity: 1, duration: 1 }) // Fade in container just in case
            .to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2
            })
            .to(subtitleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1
            }, '-=1')
            .to(scrollRef.current, {
                opacity: 0.7,
                duration: 1
            }, '-=0.5');

        // Simple background parallax or floating effect could be added here

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.gridBackground}></div>

            <div className={styles.content}>
                <h1 className={styles.title} ref={titleRef}>
                    <span style={{ display: 'block' }}>Sparsh</span>
                    <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '2px var(--text-color)' }}>Prakash</span>
                </h1>
                <p className={styles.subtitle} ref={subtitleRef}>
                    &lt; SDE DATA 1 /&gt;
                </p>
            </div>

            <div className={styles.scrollIndicator} ref={scrollRef}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
