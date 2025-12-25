import { useState, useEffect } from 'react';
import styles from './CommandPalette.module.css';

interface CommandPaletteProps {
    onOpenVault: () => void;
    onOpenBioMetrics: () => void;
    onOpenMemeForge: () => void;
    onOpenStickerHub: () => void;
}

const CommandPalette = ({ onOpenVault, onOpenBioMetrics, onOpenMemeForge, onOpenStickerHub }: CommandPaletteProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    // Toggle with Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const commands = [
        {
            id: 'vault',
            label: 'Open The Vault',
            shortcut: '↵',
            action: () => { onOpenVault(); setIsOpen(false); }
        },
        {
            id: 'bio',
            label: 'System Diagnostics (Bio-Metrics)',
            shortcut: 'B',
            action: () => { onOpenBioMetrics(); setIsOpen(false); }
        },
        {
            id: 'meme',
            label: 'Initialize Meme Forge',
            shortcut: 'M',
            action: () => { onOpenMemeForge(); setIsOpen(false); }
        },
        {
            id: 'sticker',
            label: 'Enter Sticker Hub',
            shortcut: 'S',
            action: () => { onOpenStickerHub(); setIsOpen(false); }
        },
        {
            id: 'home',
            label: 'Go to Home',
            shortcut: 'H',
            action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }
        },
        {
            id: 'contact',
            label: 'Contact Me',
            shortcut: 'C',
            action: () => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            }
        },
        {
            id: 'source',
            label: 'View Source Code',
            shortcut: 'S',
            action: () => {
                window.open('https://github.com/isparshp', '_blank');
                setIsOpen(false);
            }
        }
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                <div className={styles.inputWrapper}>
                    <span className={styles.prompt}>&gt;</span>
                    <input
                        autoFocus
                        className={styles.input}
                        placeholder="Type a command..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <div className={styles.list}>
                    {filteredCommands.map(cmd => (
                        <div
                            key={cmd.id}
                            className={styles.option}
                            onClick={cmd.action}
                        >
                            <span>{cmd.label}</span>
                            <span className={styles.shortcut}>{cmd.shortcut}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
