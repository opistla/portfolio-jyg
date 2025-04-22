import { useRouter } from 'next/router';
import { UiButton } from '@/components';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 좌우 레이아웃 간격 조정 및 공간 효율화 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          {/* 자기소개 텍스트 - 너비 조정 */}
          <div className="md:max-w-lg md:flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-center md:text-left">
              안녕하세요 <br />
              <span className="text-blue-600 dark:text-blue-400">웹 개발자 JYG</span>입니다
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center md:text-left">
              혁신적인 웹 경험을 만드는 열정적인 개발자입니다. 모던 웹 기술과 창의적인 문제 해결
              능력으로 사용자 중심의 솔루션을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-0">
              <div className="relative group">
                {/* 버튼 뒤에 나타나는 강조 효과 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-300"></div>
                <div className="relative">
                  <UiButton
                    label="스킬이력 보기"
                    onClick={() => router.push('/inventory')}
                    size="large"
                    className="font-bold"
                  />
                </div>
              </div>
              <UiButton
                variant="secondary"
                label="연락하기"
                onClick={() => scrollToSection('contact')}
              />
            </div>
          </div>

          {/* 프로필 이미지 */}
          <div className="mt-4 md:mt-0 md:ml-4">
            <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden shadow-xl">
              <Image
                src="/images/myprofile.jpeg"
                alt="프로필 이미지"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* 여백을 채우는 기술 스택 아이콘 */}
            <div className="hidden md:flex mt-4 justify-around">
              {['JS', 'React', 'Next'].map((tech, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
