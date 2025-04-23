import Link from 'next/link';
import Image from 'next/image';

const Projects = () => {
  // 프로젝트 데이터 배열
  const projects = [
    {
      id: 1,
      title: 'PC Market',
      year: '2021년',
      description:
        'pc방 시스템과 먹거리 구매 시스템을 구현한 프로젝트입니다.\nReact, Mobx, Semantic UI를 사용했습니다',
      link: 'https://pcmarket.vercel.app',
      image: '/images/projects/pc-main.png', // 온라인 샘플 이미지
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-purple-500',
      externalLink: true, // 외부 링크 여부 (새 탭에서 열기)
    },
    {
      id: 2,
      title: '포트폴리오 웹사이트',
      year: '',
      description: 'Next.js와 Tailwind CSS로 구현한 반응형 포트폴리오 웹사이트입니다.',
      link: '#',
      image: 'https://picsum.photos/800/400?random=2', // 온라인 샘플 이미지
      gradientFrom: 'from-green-500',
      gradientTo: 'to-teal-500',
      externalLink: false, // 내부 링크
    },
    {
      id: 3,
      title: '커밍 순',
      year: '',
      description: '새로운 프로젝트가 곧 이 곳에 공개됩니다. 기대해 주세요!',
      link: '#',
      image: '', // 이미지 없음
      gradientFrom: 'from-red-500',
      gradientTo: 'to-orange-500',
      externalLink: false, // 내부 링크
    },
  ];

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-800 relative">
      {/* 배경 오버레이 - 하단 배경 요소를 약화시킴 */}
      <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60"></div>

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
        {'{'}
      </div>

      <div
        className="absolute bottom-10 right-10 opacity-15"
        style={{
          fontSize: '100px',
          fontFamily: 'monospace',
          color: 'rgba(30, 64, 175, 0.5)',
        }}
      >
        {'}'}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">프로젝트</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            개인적으로 진행한 프로젝트들을 확인해보세요. 각 프로젝트는 저의 기술과 문제 해결 능력을
            보여줍니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 프로젝트 카드들을 동적으로 생성 */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                {project.image ? (
                  <>
                    {/* 이미지 로드 실패를 대비한 백업 그라디언트 배경 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo} flex items-center justify-center z-0`}
                    >
                      <span className="text-white text-xl font-bold">{project.title}</span>
                    </div>

                    {/* Next.js Image 컴포넌트 */}
                    <div className="relative z-10 w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority={project.id === 1}
                        onError={(e) => {
                          // 이미지 로드 실패 시 부모 요소 숨김
                          e.currentTarget.parentElement.style.display = 'none';
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className={`h-48 bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo} flex items-center justify-center`}
                  >
                    <span className="text-white text-xl font-bold">{project.title}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {project.title}
                  {project.year && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      ({project.year})
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  target={project.externalLink ? '_blank' : '_self'}
                  rel={project.externalLink ? 'noopener noreferrer' : ''}
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
