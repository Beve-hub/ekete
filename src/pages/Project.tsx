import Footer from "../components/Footer"
import { Project as projectData } from "../utils/data"

const Project = () => {
  return (
     <div className="min-h-screen flex flex-col">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
      {
        projectData.map((item, index) => (
          <div key={index} className="mb-4 border-b py-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.summary}</p>
            
            <div className="mt-2">
              <a href={item.repo} className="text-[var(--primary)] hover:underline ">View Repository</a>
            </div>
          </div>
        ))
      }
    </div>

    <Footer />
    </div>
  )
}

export default Project