import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.content} ref={containerRef}>
                <h2 className={styles.heading}>Initialize Connection</h2>
                <p className={styles.text}>
                    Always open to discussing new opportunities, interesting datasets,
                    or just chatting about system architecture.
                </p>

                <a href="mailto:sparsh.prakash03@gmail.com" className={styles.emailButton}>
                    Start Transmission
                </a>

                <div className={styles.socials}>
                    <a href="https://github.com/isparshp" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
                    <a href="https://bysparsh.me" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Website</a>
                    <a href="https://linkedin.com/in/isparshp" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
                </div>
            </div>

            <footer className={styles.footer}>
                © {new Date().getFullYear()} SDE DATA. System Operational.
            </footer>
        </section>
    );
};

export default Contact;
