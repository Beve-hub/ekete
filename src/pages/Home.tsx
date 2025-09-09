// src/pages/Home.jsx
import Footer from '../components/Footer';
import LeftHome from './../components/LeftHome';
import RightHome from './../components/RightHome';
import { ArticlesCard } from './../components/ArticlesCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectDetails } from './../components/ProjectDetails';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
        <section className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <LeftHome />
          </div>
          <div className="md:col-span-2">
            <RightHome />
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div>
              <h1 className="border-b py-4 text-xl sm:text-2xl">Articles</h1>
              <ArticlesCard limit={3} />
              <div className="mt-6 text-start">
                <Link to="/articles" className="text-[var(--primary)] hover:underline">
                  View More <ArrowRight className="inline text-[var(--primary)]" />
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div>
              <h1 className="border-b py-4 text-xl sm:text-2xl">Project</h1>
              <ProjectDetails limit={3} />
              <div className="mt-6 text-start">
                <Link to="/project" className="text-[var(--primary)] hover:underline">
                  View More <ArrowRight className="inline text-[var(--primary)]" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
