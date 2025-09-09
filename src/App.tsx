import Experience from "./pages/Experience"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Project from "./pages/Project"
import { useTheme } from './hooks/useTheme';
import Articles from './pages/Articles';
import ArticleDetails from './components/ArticleDetails';


const App = () => {
  useTheme(); 

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/project" element={<Project />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App