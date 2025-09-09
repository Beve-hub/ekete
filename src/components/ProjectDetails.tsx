import { Project } from "../utils/data"

export const ProjectDetails = ({ limit }: { limit?: number }) => {
  const displayProjects = limit ? Project.slice(0, limit) : Project;
  // Helper to limit to 100 words
  const limitWords = (text: string, max: number) => {
    const words = text.trim().split(/\s+/);
    return words.length > max ? words.slice(0, max).join(' ') + '...' : text;
  };
  return (
    <div>
      {
        displayProjects.map((item, index) => (
          <div key={index} className="my-4 rounded border p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{limitWords(item.summary, 20)}</p>
            <div className="mt-2">
              <a href={item.repo} className="text-blue-500 hover:underline ">View Repository</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}


