import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import { Hero, Projects, Skill, Contact, Footer, Navigation } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 relative`}
    >
      {/* 개발자스러운 배경 요소 - 전체 페이지에 적용 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 왼쪽 상단 코드 스니펫 */}
        <div className="absolute top-15 left-0 opacity-20 text-xl font-mono p-4 bg-gray-50/5 dark:bg-gray-800/5 rounded-br-2xl text-blue-800 dark:text-blue-300">
          &lt;div className="hero"&gt;
          <br />
          &nbsp;&nbsp;import React from 'react';
          <br />
          &nbsp;&nbsp;const App = () =&gt; {`{`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;return (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;Hello World&lt;/div&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;);
          <br />
          &nbsp;&nbsp;{`}`}
          <br />
        </div>

        {/* 오른쪽 하단 코드 스니펫 */}
        <div className="absolute bottom-0 right-0 opacity-20 text-xl font-mono p-4 bg-gray-50/5 dark:bg-gray-800/5 rounded-tl-2xl text-blue-800 dark:text-blue-300">
          function multiply(a, b) {`{`}
          <br />
          &nbsp;&nbsp;return a * b;
          <br />
          {`}`}
          <br />
          const result = multiply(5, 10);
          <br />
          console.log(result);
          <br />
        </div>

        {/* 다양한 기술 키워드들 - 더 진하게 */}
        <div className="absolute top-[2%] right-[5%] opacity-25 rotate-12 text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          JavaScript
        </div>
        <div className="absolute top-[4%] left-[5%] opacity-25 -rotate-12 text-3xl font-bold text-blue-700 dark:text-blue-300">
          React
        </div>
        <div className="absolute top-[6%] left-[20%] opacity-25 rotate-45 text-3xl font-bold text-blue-800 dark:text-blue-200">
          TypeScript
        </div>
        <div className="absolute top-[8%] right-[20%] opacity-25 -rotate-45 text-3xl font-bold text-green-700 dark:text-green-300">
          Node.js
        </div>
        <div className="absolute top-[10%] right-[25%] opacity-25 rotate-90 text-3xl font-bold text-orange-600 dark:text-orange-300">
          HTML5
        </div>
        <div className="absolute top-[12%] left-[25%] opacity-25 -rotate-90 text-3xl font-bold text-blue-500 dark:text-blue-300">
          CSS3
        </div>
        <div className="absolute top-[14%] right-[35%] opacity-25 rotate-6 text-3xl font-bold text-indigo-900 dark:text-indigo-200">
          Next.js
        </div>
        <div className="absolute top-[16%] left-[40%] opacity-25 -rotate-6 text-3xl font-bold text-cyan-700 dark:text-cyan-300">
          Tailwind
        </div>

        {/* 추가 기술 키워드들 */}
        <div className="absolute top-[18%] right-[50%] opacity-25 rotate-15 text-3xl font-bold text-purple-700 dark:text-purple-300">
          GraphQL
        </div>
        <div className="absolute top-[1%] left-[30%] opacity-25 -rotate-15 text-3xl font-bold text-red-700 dark:text-red-300">
          Redux
        </div>
        <div className="absolute top-[22%] right-[15%] opacity-25 rotate-25 text-3xl font-bold text-yellow-700 dark:text-yellow-300">
          Express
        </div>
        <div className="absolute top-[5%] left-[55%] opacity-25 -rotate-25 text-3xl font-bold text-green-600 dark:text-green-300">
          MongoDB
        </div>
        <div className="absolute top-[26%] right-[30%] opacity-25 rotate-18 text-3xl font-bold text-blue-600 dark:text-blue-300">
          Docker
        </div>
        <div className="absolute top-[28%] left-[35%] opacity-25 -rotate-18 text-3xl font-bold text-orange-700 dark:text-orange-300">
          Git
        </div>
        <div className="absolute top-[30%] right-[40%] opacity-25 rotate-0 text-3xl font-bold text-teal-700 dark:text-teal-300">
          REST API
        </div>
        <div className="absolute top-[32%] left-[45%] opacity-25 rotate-0 text-3xl font-bold text-pink-700 dark:text-pink-300">
          Figma
        </div>

        {/* 더 많은 키워드들로 화면을 꽉 채우기 */}
        <div className="absolute top-[3%] left-[70%] opacity-25 rotate-[22deg] text-2xl font-bold text-yellow-600 dark:text-yellow-300">
          AWS
        </div>
        <div className="absolute top-[7%] right-[65%] opacity-25 -rotate-[33deg] text-4xl font-bold text-red-500 dark:text-red-300">
          Firebase
        </div>
        <div className="absolute top-[13%] right-[10%] opacity-25 rotate-[67deg] text-2xl font-bold text-green-500 dark:text-green-300">
          Vue.js
        </div>
        <div className="absolute top-[9%] left-[8%] opacity-25 -rotate-[56deg] text-3xl font-bold text-red-700 dark:text-red-400">
          Angular
        </div>
        <div className="absolute top-[19%] right-[7%] opacity-25 rotate-[12deg] text-4xl font-bold text-blue-400 dark:text-blue-300">
          SQL
        </div>
        <div className="absolute top-[11%] left-[65%] opacity-25 -rotate-[18deg] text-2xl font-bold text-blue-700 dark:text-blue-400">
          Python
        </div>
        <div className="absolute top-[23%] right-[52%] opacity-25 rotate-[78deg] text-3xl font-bold text-orange-800 dark:text-orange-300">
          Java
        </div>
        <div className="absolute top-[15%] left-[12%] opacity-25 -rotate-[37deg] text-2xl font-bold text-green-700 dark:text-green-400">
          Spring
        </div>
        <div className="absolute top-[27%] right-[56%] opacity-25 rotate-[42deg] text-4xl font-bold text-blue-500 dark:text-blue-200">
          Flutter
        </div>
        <div className="absolute top-[2%] left-[45%] opacity-25 -rotate-[25deg] text-3xl font-bold text-orange-600 dark:text-orange-400">
          Svelte
        </div>
        <div className="absolute top-[20%] left-[60%] opacity-25 rotate-[15deg] text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          PHP
        </div>
        <div className="absolute top-[6%] right-[42%] opacity-25 -rotate-[8deg] text-3xl font-bold text-red-600 dark:text-red-300">
          Ruby
        </div>
        <div className="absolute top-[25%] left-[75%] opacity-25 rotate-[33deg] text-2xl font-bold text-blue-800 dark:text-blue-400">
          Kubernetes
        </div>
        <div className="absolute top-[17%] right-[72%] opacity-25 -rotate-[22deg] text-2xl font-bold text-red-800 dark:text-red-400">
          Jenkins
        </div>
        <div className="absolute top-[24%] left-[2%] opacity-25 rotate-[15deg] text-3xl font-bold text-green-800 dark:text-green-300">
          CI/CD
        </div>
        <div className="absolute top-[7%] right-[2%] opacity-25 -rotate-[30deg] text-2xl font-bold text-blue-900 dark:text-blue-300">
          Webpack
        </div>
        <div className="absolute top-[29%] left-[22%] opacity-25 rotate-[27deg] text-2xl font-bold text-yellow-800 dark:text-yellow-300">
          Babel
        </div>
        <div className="absolute top-[33%] right-[27%] opacity-25 -rotate-[35deg] text-3xl font-bold text-pink-600 dark:text-pink-300">
          SASS
        </div>
        <div className="absolute top-[31%] left-[55%] opacity-25 rotate-[18deg] text-4xl font-bold text-indigo-500 dark:text-indigo-200">
          WebGL
        </div>
        <div className="absolute top-[35%] right-[60%] opacity-25 -rotate-[42deg] text-3xl font-bold text-blue-700 dark:text-blue-300">
          Three.js
        </div>

        {/* 더욱 다양한 위치와 크기의 키워드들 */}
        <div className="absolute top-[1.5%] left-[85%] opacity-20 rotate-[5deg] text-xl font-bold text-teal-600 dark:text-teal-300">
          Electron
        </div>
        <div className="absolute top-[3.5%] right-[85%] opacity-20 -rotate-[5deg] text-xl font-bold text-purple-600 dark:text-purple-300">
          Socket.io
        </div>
        <div className="absolute top-[5%] left-[78%] opacity-20 rotate-[60deg] text-lg font-bold text-green-500 dark:text-green-200">
          jQuery
        </div>
        <div className="absolute top-[8.5%] right-[78%] opacity-20 -rotate-[60deg] text-lg font-bold text-orange-500 dark:text-orange-200">
          Laravel
        </div>
        <div className="absolute top-[11%] left-[48%] opacity-20 rotate-[38deg] text-xl font-bold text-blue-400 dark:text-blue-200">
          RxJS
        </div>
        <div className="absolute top-[13.5%] right-[48%] opacity-20 -rotate-[38deg] text-lg font-bold text-yellow-400 dark:text-yellow-200">
          Jest
        </div>
        <div className="absolute top-[16%] left-[82%] opacity-20 rotate-[72deg] text-xl font-bold text-red-400 dark:text-red-200">
          Cypress
        </div>
        <div className="absolute top-[19.5%] right-[82%] opacity-20 -rotate-[72deg] text-lg font-bold text-green-400 dark:text-green-200">
          Vite
        </div>
        <div className="absolute top-[22%] left-[88%] opacity-20 rotate-[28deg] text-xl font-bold text-indigo-400 dark:text-indigo-200">
          Gulp
        </div>
        <div className="absolute top-[37%] right-[3%] opacity-20 -rotate-[28deg] text-lg font-bold text-pink-400 dark:text-pink-200">
          ESLint
        </div>

        {/* 기술적 기호 - 더 크고 진하게 */}
        <div className="absolute top-[25%] left-[5%] opacity-40 text-6xl font-mono text-gray-800 dark:text-gray-200 animate-pulse-custom">{`{ }`}</div>
        <div className="absolute bottom-[20%] right-[5%] opacity-40 text-6xl font-mono text-gray-800 dark:text-gray-200 animate-pulse-custom">
          &lt;/&gt;
        </div>
        <div className="absolute top-[45%] left-[30%] opacity-40 text-6xl font-mono text-gray-800 dark:text-gray-200">
          ()
        </div>
        <div className="absolute bottom-[45%] right-[30%] opacity-40 text-6xl font-mono text-gray-800 dark:text-gray-200">
          ;
        </div>

        {/* 중앙에 큰 코드 기호 추가 */}
        <div className="absolute top-[19%] left-1/2 transform -translate-x-1/2 opacity-30 text-9xl font-mono text-blue-900 dark:text-blue-200 animate-pulse-custom">{`{}`}</div>
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 opacity-30 text-9xl font-mono text-blue-900 dark:text-blue-200 animate-pulse-custom">
          &lt;/&gt;
        </div>

        {/* 추가 코드 라인 - 가로로 흐르는 효과 */}
        <div className="absolute top-[19%] w-full opacity-30 whitespace-nowrap overflow-hidden font-mono text-xl text-green-800 dark:text-green-200">
          <div className="animate-marquee">
            const fetchData = async () =&gt; {`{`} try {`{`} const response = await
            fetch('/api/data'); const data = await response.json(); return data; {`}`} catch (error){' '}
            {`{`} console.error('Error:', error); {`}`} {`}`};
          </div>
        </div>

        {/* 추가 기술 요소들 - 특별 위치 */}
        <div className="absolute top-[15%] left-[70%] opacity-40 text-2xl font-bold text-purple-700 dark:text-purple-300">
          API
        </div>
        <div className="absolute top-[11%] left-[60%] opacity-40 text-2xl font-bold text-red-700 dark:text-red-300">
          Redux
        </div>
        <div className="absolute top-[4%] left-[30%] opacity-40 text-2xl font-bold text-yellow-700 dark:text-yellow-300">
          Git
        </div>
        <div className="absolute top-[9%] left-[40%] opacity-40 text-2xl font-bold text-green-600 dark:text-green-300">
          MongoDB
        </div>

        {/* 격자 배경 - 더 진하게 */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(30, 64, 175, 0.5) 2px, transparent 2px), linear-gradient(to bottom, rgba(30, 64, 175, 0.5) 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      <Head>
        <title>JYG Portfolio</title>
        <meta name="description" content="Welcome to my portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 모든 섹션을 감싸는 컨테이너에 z-10을 추가하여 배경 위에 표시 */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skill />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
