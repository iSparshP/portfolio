import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        role: 'SDE Data Intern',
        company: 'Refyne India',
        date: 'Mar 2024 – Current',
        description: 'Migrated pipelines to PyArrow + Parquet on S3/Redshift (60% cost cut). Built Airflow/Lambda ETL for Govt. of Rajasthan reducing manual effort by 80%. Automated validation for $10M+ data.',
        tech: ['PyArrow', 'Redshift', 'Airflow', 'AWS Lambda']
    },
    {
        role: 'Data Engineering Intern',
        company: 'Cognizant Technology Solutions',
        date: 'Dec 2024 – Mar 2025',
        description: 'Developed scalable GCP pipelines using Dataproc, Dataflow, and BigQuery. Implemented Medallion Architecture. Designed automated ETL workflows for data integrity.',
        tech: ['GCP', 'BigQuery', 'Dataflow', 'Dataproc']
    },
    {
        role: 'AI & ML Intern',
        company: 'CodingJr',
        date: 'Jun 2024 – Aug 2024',
        description: 'Built AI-powered VS Code extension for code generation. Developed Flask APIs using LLaMA 3.1 & Gemini API. Deployed on Render for low-latency global availability.',
        tech: ['Flask', 'LLaMA 3.1', 'Gemini API', 'Render']
    }
];

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Animate timeline items
        itemsRef.current.forEach((item) => {
            if (item) {
                gsap.fromTo(item,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <section className={styles.experience} ref={sectionRef}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Experience Log</h2>

                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={styles.timelineItem}
                            ref={el => { itemsRef.current[index] = el; }}
                        >
                            <div className={styles.timelineDot}></div>
                            <span className={styles.date}>{exp.date}</span>
                            <h3 className={styles.role}>{exp.role}</h3>
                            <div className={styles.company}>{exp.company}</div>
                            <p className={styles.description}>{exp.description}</p>
                            <div className={styles.techStack}>
                                {exp.tech.map(t => (
                                    <span key={t} className={styles.techTag}>{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
