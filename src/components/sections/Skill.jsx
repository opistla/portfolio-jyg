const Skill = () => {
  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900 relative">
      {/* 배경 오버레이 - 하단 배경 요소를 약화시킴 */}
      <div className="absolute inset-0 bg-gray-50/60 dark:bg-gray-900/60"></div>

      {/* 직접 추가한 코드 배경 효과 - CSS 의존성 없음 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(30, 64, 175, 0.07) 19px, rgba(30, 64, 175, 0.07) 20px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(30, 64, 175, 0.07) 19px, rgba(30, 64, 175, 0.07) 20px)
        `,
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* 코드 기호 배경 요소 */}
      <div
        className="absolute top-10 left-10 opacity-15"
        style={{
          fontSize: '100px',
          fontFamily: 'monospace',
          color: 'rgba(30, 64, 175, 0.5)',
        }}
      >
        {'<'}
      </div>

      <div
        className="absolute bottom-10 right-10 opacity-15"
        style={{
          fontSize: '100px',
          fontFamily: 'monospace',
          color: 'rgba(30, 64, 175, 0.5)',
        }}
      >
        {'>'}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
