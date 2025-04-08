const Skill = () => {
  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기술 스택</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            프로젝트에서 사용하는 주요 기술들입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            'JavaScript',
            'React',
            'Next.js',
            'Node.js',
            'Tailwind CSS',
            'Supabase',
            'Git',
            'Responsive Design',
          ].map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  {skill.charAt(0)}
                </span>
              </div>
              <h3 className="font-medium">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
