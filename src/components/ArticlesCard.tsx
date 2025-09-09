import { articles } from '../utils/data';
import { Link, useParams } from 'react-router-dom';


export const ArticlesCard = ({ limit }: { limit?: number }) => {
    const { id } = useParams();
    // Filter out the current article if id is present
    let filteredArticles = articles;
    if (id) {
        filteredArticles = articles.filter(article => article.id !== id);
    }
    const displayArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles;
    return (

        <div className="grid gap-6">
            {displayArticles.map(article => {
                const firstSection = article.sections[0];
                return (
                    <Link to={`/articles/${article.id}`} key={article.id} className="block rounded shadow hover:shadow-lg p-4">
                        <div className="flex gap-4 items-start border-b pb-2">
                            {firstSection.image && (
                                <img src={firstSection.image} alt={firstSection.heading} className="w-[5rem] h-[5rem] mb-2" />
                            )}
                            <div>
                                <h2 className="text-lg font-bold mb-2 hover:underline hover:decoration-[var(--primary)]">{article.title}</h2>
                                <p className="text-sm mb-2">"{firstSection.content}"</p>
                                <p className="text-xs text-gray-500">{article.date}</p>
                            </div>
                        </div>

                    </Link>
                );
            })}
        </div>
    )
};
