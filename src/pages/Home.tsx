import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LeftHome from '../components/LeftHome';
import RightHome from '../components/RightHome';
import { ArticlesCard } from '../components/ArticlesCard';
import { ProjectDetails } from '../components/ProjectDetails';

const ARTICLES_LIMIT = 3;
const PROJECTS_LIMIT = 3;

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="border-b py-4 text-xl sm:text-2xl font-semibold">
    {title}
  </h2>
);

const ViewMoreLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline transition-colors"
    aria-label={`View more ${label}`}
  >
    {label}
    <ArrowRight size={18} />
  </Link>
);

const ContentSection: React.FC<{
  title: string;
  children: React.ReactNode;
  viewMoreLink: string;
  viewMoreLabel: string;
}> = ({ title, children, viewMoreLink, viewMoreLabel }) => (
  <div>
    <SectionHeader title={title} />
    <div className="mt-4">
      {children}
    </div>
    <div className="mt-4">
      <ViewMoreLink to={viewMoreLink} label={viewMoreLabel} />
    </div>
  </div>
);

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Hero Section */}
        <section className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <LeftHome />
          </div>
          <div className="md:col-span-3">
            <RightHome />
          </div>
        </section>

        {/* Articles & Projects Section */}
        <section className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <ContentSection
              title="Articles"
              viewMoreLink="/articles"
              viewMoreLabel="View More Articles"
            >
              <ArticlesCard limit={ARTICLES_LIMIT} />
            </ContentSection>
          </div>

          <div className="md:col-span-3">
            <ContentSection
              title="Projects"
              viewMoreLink="/project"
              viewMoreLabel="View More Projects"
            >
              <ProjectDetails limit={PROJECTS_LIMIT} />
            </ContentSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;