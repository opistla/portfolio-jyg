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
            {exp.projectDescription && (
              <div>
                <p className="font-bold">프로젝트 소개</p>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {convertUrlsToLinks(exp.projectDescription)}
                </p>
              </div>
            )}

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
              <p className="font-bold">기술스택</p>
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
