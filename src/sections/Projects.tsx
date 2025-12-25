import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Server Metrics Pipeline (GCP)',
        description: 'High-throughput pipeline processing 400K+ metrics/min using Python & GCP. Architected Medallion architecture in BigQuery improving data quality by 95%. Optimized costs by 40% via clustering.',
        tech: ['GCP', 'BigQuery', 'Composer', 'Python'],
        link: '#'
    },
    {
        title: "Rubik's Cube Solver",
        description: "C++ solver using Korf's IDA* Algorithm. Modeled 3D cube state and achieved <10s solve time for 13-jumble complexity. Implemented BFS/DFS/IDDFS for optimal pathfinding.",
        tech: ['C++', 'Algorithms', 'IDA*', 'CLion'],
        link: '#'
    }
];

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Staggered animation for cards
        gsap.fromTo(cardRefs.current.filter(Boolean),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section className={styles.projects} ref={sectionRef}>
            <h2 className={styles.heading}>Feature Projects</h2>

            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        ref={el => { cardRefs.current[index] = el; }}
                    >
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectDesc}>{project.description}</p>
                        <div className={styles.techStack}>
                            {project.tech.map(t => (
                                <span key={t} className={styles.techTag}>{t}</span>
                            ))}
                        </div>
                        {/* 
            <div className={styles.links}>
                <a href={project.link} className={styles.link}>View Project</a>
            </div> 
            */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
