import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100`}
    >
      <Head>
        <title>JYG Portfolio</title>
        <meta name="description" content="Welcome to my portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold font-[family-name:var(--font-geist-sans)]">
                JYG
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {['about', 'projects', 'skills', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === section
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                안녕하세요, <br />
                <span className="text-blue-600 dark:text-blue-400">웹 개발자 JYG</span>입니다
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                혁신적인 웹 경험을 만드는 열정적인 개발자입니다. 모던 웹 기술과 창의적인 문제 해결
                능력으로 사용자 중심의 솔루션을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  프로젝트 보기
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  연락하기
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 text-center"
                  onClick={(e) => {
                    router.push('/sample');
                  }}
                >
                  관리자
                </a>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-4xl">JYG</span>
                    </div>
                    <p className="text-xl font-medium">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
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
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  자세히 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">연락하기</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              프로젝트 협업이나 문의사항이 있으시면 언제든 연락주세요.
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  메시지
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="문의사항을 입력해주세요."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                보내기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} JYG. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M5.223 2.503A2.72 2.72 0 0 0 2.5 5.223v13.554c0 1.5 1.223 2.723 2.723 2.723h13.554a2.72 2.72 0 0 0 2.723-2.723V5.223a2.72 2.72 0 0 0-2.723-2.72H5.223zm.77 6.28v8.963h2.774V8.784H5.994zm1.388-1.155a1.665 1.665 0 1 0-.001-3.33 1.665 1.665 0 0 0 .001 3.33zm11.07 10.118V13.25c0-2.324-.5-4.109-3.198-4.109-1.298 0-2.167.711-2.523 1.386h-.035V9.346H9.975v8.963h2.78v-4.438c0-1.167.221-2.3 1.671-2.3 1.427 0 1.45 1.335 1.45 2.372v4.359h2.575z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
