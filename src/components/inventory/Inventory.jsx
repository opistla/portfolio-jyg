import WorkExperience from './WorkExperience';
import { useRouter } from 'next/router';

const Inventory = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            뒤로가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills & Experience</h1>
        </div>
        <button
          onClick={() => router.push('/admin/experiences')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          경력 관리
        </button>
      </div>

      {/* 경력 사항 */}
      <div className="mb-12">
        <WorkExperience />
      </div>

      {/* 기술 스택 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                Languages & Frameworks
              </h3>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>React</li>
                <li>Next</li>
                <li>Vue</li>
                <li>Nuxt</li>
                <li>Typescript</li>
                <li>ReactQuery</li>
                <li>Redux</li>
                <li>Mobx</li>
                <li>Reflux</li>
                <li>JSP</li>
                <li>JAVA</li>
                <li>Meteor</li>
                <li>jQuery</li>
                <li>backBone</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                Tools & Editors
              </h3>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>vsCode</li>
                <li>Cursor</li>
                <li>Atom</li>
                <li>Eclipse</li>
                <li>intelliJ</li>
                <li>PostMan</li>
                <li>git</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                UI Libraries
              </h3>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Semantic UI</li>
                <li>Chakra UI</li>
                <li>Material UI</li>
                <li>Storybook</li>
                <li>fullcalendar</li>
                <li>highChart</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                API & Visualization
              </h3>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>HERE Map</li>
                <li>T-map API</li>
                <li>실시간 API연결</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
