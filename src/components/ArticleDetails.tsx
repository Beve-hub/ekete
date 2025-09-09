import { ArrowLeft } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import ArticleContentDetail from "./ArticleContentDetail";
import ArticleContentTable from "./ArticleContentTable";
import { articles } from '../utils/data';
import { ArticlesCard } from './ArticlesCard';
import Table from "./Table";
import Footer from "./Footer";

const ArticleDetails = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);
  const otherArticles = articles.filter(a => a.id !== id);

  if (!article) return (
    <div className="container mx-auto px-4 py-8 text-center">Article not found</div>
  );

  return (
    <div className="min-h-screen flex flex-col">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <Link to="/articles" className="flex items-center justify-start md:justify-start gap-2 text-[var(--primary)]">
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Link>
      </div>

  
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 my-6 grid gap-10 md:grid-cols-5 justify-items-center md:justify-items-stretch">
        <section className="w-full md:col-span-3 text-start md:text-left mx-auto md:mx-0 max-w-3xl md:max-w-none">
          <ArticleContentDetail />

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-start md:text-left">Other Articles</h3>
            <ArticlesCard key="other-articles" limit={otherArticles.length > 3 ? 3 : otherArticles.length} />
          </div>
        </section>

        <aside className="hidden md:block md:col-span-2">
          <div>
            <ArticleContentTable />
            <h2 className="my-4">Table of Contents:</h2>
            <Table sections={article.sections} />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetails;
