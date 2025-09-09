import { Dot } from 'lucide-react';

const Table = ({ sections }: { sections: { heading: string }[] }) => {
    return (
        <div>
            <ul>
                {sections.map((section, idx) => (
                    <li key={idx}>
                        <a
                            href={`#section-${idx}`}
                            className="cursor-pointer transition-colors duration-200 flex items-center gap-1"
                        >
                            <Dot /> {section.heading}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Table;