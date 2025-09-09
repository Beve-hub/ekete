import { useParams } from 'react-router-dom';
import { articles } from '../utils/data';


const ArticleContentDetail = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);
    if (!article) return <div>No content available</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <div  className="mb-4 flex  gap-4">
                <p className="text-sm text-[var(--text)] mb-4">{article.date}</p>
              <p className=' '>|</p>
                <p className="text-sm text-[var(--text)] mb-4"><span className="text-gray-500">Author:</span> {article.author}</p>
            </div>
            <img src={article.coverImage} alt={article.title} className="mb-2 w-full max-w-2xl h-[200px] rounded-md" />
            {article.sections.map((section, idx) => (
                <div key={idx} id={`section-${idx}`} className="mb-4">
                    <h3 className="text-lg font-semibold">{section.heading}</h3>
                    <p className="text-sm text-[var(--text)]">{section.content}</p>
                </div>
            ))}
        </div>
    );
}

export default ArticleContentDetail;