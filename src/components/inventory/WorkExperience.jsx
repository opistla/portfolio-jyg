import { useState, useEffect } from 'react';
import { Accordion, Label } from '@/components';
import { getAllExperiences } from '@/lib/supabase-client';

// URL을 감지하여 HTML 링크 태그로 변환하는 함수
const convertUrlsToLinks = (text) => {
  if (!text) return '';

  // URL 정규식 패턴 (http, https로 시작하는 URL)
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // URL을 a 태그로 변환
  return text.split(urlPattern).map((part, i) => {
    // 짝수 인덱스는 일반 텍스트, 홀수 인덱스는 URL
    if (urlPattern.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await getAllExperiences();
        setExperiences(data);
      } catch (err) {
        console.error('경력 데이터 로딩 실패:', err);
        setError('경력 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // 데이터가 없을 때 대체 데이터
  // const fallbackExperience = {
  //   id: 'fallback',
  //   project: 'SK브로드밴드 각종 서비스 개발',
  //   company: '토모도모',
  //   companyType: '프리랜서',
  //   client: 'SK브로드밴드',
  //   period: '2023년 6월 ~ 2025년 12월',
  //   role: '각 프로젝트의 공통 컴포넌트 개발',
  //   details: [
  //     {
  //       name: 'AI HubBackoffice 화면 개발',
  //       description: 'highChart를 이용한 다양한 통계 분석 화면 개발',
  //     },
  //     {
  //       name: 'chatGPT AI상담 내역 화면 개발',
  //       description: '실시간 API 연결 고객과 AI상담사 채팅 화면 개발',
  //     },
  //     {
  //       name: 'sk 내부 Maptice 화면 개발(maptics, maptics-backoffice, maptics-campaign-bizchat)',
  //       description: 'Tmap api를 활용한 지도 및 통계 내역 화면 개발',
  //     },
  //   ],
  // };

  // 표시할 경력 데이터
  const displayExperiences = experiences.length > 0 ? experiences : [];

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">경력 사항</h2>
        <div className="py-4 text-gray-500">경력 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">경력 사항</h2>
        <div className="py-4 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">경력 사항</h2>

      {displayExperiences.map((exp) => (
        <Accordion
          key={exp.id}
          title={
            <div className="flex flex-col">
              <div className="font-bold text-xl text-blue-700 dark:text-blue-400 tracking-tight">
                {exp.project}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                {exp.period}
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <p className="font-bold">회사명</p>
              <div className="flex items-center gap-2">
                <p>{exp.company}</p>
                <Label label={exp.companyType || '프리랜서'} />
              </div>
            </div>

            <div>
              <p className="font-bold">고객사</p>
              <p>{exp.client}</p>
            </div>

            <div>
              <p className="font-bold">역할</p>
              <p>{exp.role}</p>
            </div>

            <div>
              <p className="font-bold">세부 업무</p>
              <ul className="list-decimal pl-5 space-y-2 mt-2">
                {exp.details?.map((detail, idx) => (
                  <li key={idx}>
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-base border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                      {detail.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {convertUrlsToLinks(detail.description)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default WorkExperience;
