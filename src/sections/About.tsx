import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'Python / C++ / SQL', level: 95 },
    { name: 'Data Eng (Spark, Kafka, Airflow)', level: 90 },
    { name: 'Cloud (AWS, GCP, Docker)', level: 85 },
    { name: 'Backend (FastAPI, Node.js)', level: 90 },
    { name: 'AI/ML (PyTorch, YOLO)', level: 80 },
];

const achievements = [
    "Finalist - Google Agentic AI Hackathon 2025",
    "National Semi-Finalist - Tata Imagination Challenge 2024",
    "Solved 1000+ Problems (LeetCode, CodeChef)",
    "Published Paper at NGISE IEEE 2025"
];

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const el = sectionRef.current;

        // Animate Heading
        gsap.fromTo(headingRef.current,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                }
            }
        );

        // Animate Terminal
        gsap.fromTo(terminalRef.current,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                }
            }
        );

        // Animate Skills
        skillRefs.current.forEach((bar, index) => {
            if (bar) {
                gsap.to(bar, {
                    width: `${skills[index].level}%`,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: terminalRef.current, // Start when terminal comes into view
                        start: 'top 60%',
                    }
                });
            }
        });

    }, []);

    return (
        <section className={styles.about} ref={sectionRef}>
            <div className={styles.container}>

                <div className={styles.textColumn}>
                    <h2 className={styles.heading} ref={headingRef}>System Identity</h2>
                    <div className={styles.description}>
                        <p>
                            <strong>Sparsh Prakash</strong><br />
                            B.Tech in Computer Science<br />
                            SRM Institute of Science and Technology (2021-2025)
                        </p>
                        <p style={{ marginTop: '1rem', color: 'var(--accent-color)' }}>
                            CGPA: 8.58
                        </p>
                        <br />
                        <p>
                            I am an SDE Data enthusiast with a passion for building scalable data pipelines and intelligent systems.
                            From optimizing cloud infrastructure to deploying AI models, I transform raw data into actionable insights.
                        </p>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Achievements / Publications</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {achievements.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', color: '#ccc' }}>
                                        <span style={{ color: 'var(--accent-color)', marginRight: '10px' }}>➜</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.terminal} ref={terminalRef}>
                    <div className={styles.terminalHeader}>
                        <div className={`${styles.dot} ${styles.red}`}></div>
                        <div className={`${styles.dot} ${styles.yellow}`}></div>
                        <div className={`${styles.dot} ${styles.green}`}></div>
                        <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.8rem' }}>sparsh@skills:~</span>
                    </div>
                    <div className={styles.code}>
                        <div className={styles.skillsContainer}>
                            {skills.map((skill, index) => (
                                <div key={skill.name} className={styles.skillItem}>
                                    <div className={styles.skillLabel}>
                                        <span>{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            ref={el => { skillRefs.current[index] = el; }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
