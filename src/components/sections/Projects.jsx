import Link from 'next/link';

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">프로젝트</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            최근에 작업한 프로젝트들을 확인해보세요. 각 프로젝트는 저의 기술과 문제 해결 능력을
            보여줍니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">프로젝트 1</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">샘플 프로젝트</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Supabase와 Next.js를 활용한 CRUD 애플리케이션입니다.
              </p>
              <Link
                href="/sample"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                자세히 보기 →
              </Link>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">프로젝트 2</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">포트폴리오 웹사이트</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Next.js와 Tailwind CSS로 구현한 반응형 포트폴리오 웹사이트입니다.
              </p>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                자세히 보기 →
              </a>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">프로젝트 3</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">커밍 순</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                새로운 프로젝트가 곧 이 곳에 공개됩니다. 기대해 주세요!
              </p>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                자세히 보기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
