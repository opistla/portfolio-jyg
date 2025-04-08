import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '@/lib/supabase-client';

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

const ExperienceAdmin = () => {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // 폼 상태
  const [formMode, setFormMode] = useState('add'); // 'add' 또는 'edit'
  const [formData, setFormData] = useState({
    project: '',
    company: '',
    companyType: '',
    client: '',
    period: '',
    role: '',
    details: [],
  });

  // 새 세부 업무 항목
  const [newDetailName, setNewDetailName] = useState('');
  const [newDetailDesc, setNewDetailDesc] = useState('');

  // 세부 업무 수정 상태 관리
  const [editingDetailIndex, setEditingDetailIndex] = useState(-1);
  const [editingDetailName, setEditingDetailName] = useState('');
  const [editingDetailDesc, setEditingDetailDesc] = useState('');

  // 성공 메시지 표시 후 일정 시간 후 사라지게 하는 함수
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // 모든 경력 데이터 로드
  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await getAllExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError('경력 데이터 로드 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadExperiences();
  }, []);

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      project: '',
      company: '',
      companyType: '',
      client: '',
      period: '',
      role: '',
      details: [],
    });
    setNewDetailName('');
    setNewDetailDesc('');
    setFormMode('add');
    setSelectedExperience(null);
    setEditingDetailIndex(-1);
    setEditingDetailName('');
    setEditingDetailDesc('');
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // 데이터 유효성 검사
      if (!formData.project || !formData.company || !formData.period) {
        setError('프로젝트명, 회사명, 기간은 필수 입력항목입니다.');
        setLoading(false);
        return;
      }

      let result;
      if (formMode === 'add') {
        result = await createExperience(formData);
        showSuccessMessage('경력 정보가 성공적으로 추가되었습니다.');
      } else {
        result = await updateExperience(selectedExperience.id, formData);
        showSuccessMessage('경력 정보가 성공적으로 수정되었습니다.');
      }

      // 로컬 상태 업데이트 (RLS 오류 무시하기 위해 UI만 업데이트)
      if (formMode === 'add') {
        setExperiences((prev) => [result, ...prev]);
      } else {
        setExperiences((prev) =>
          prev.map((exp) => (exp.id === selectedExperience.id ? result : exp))
        );
      }

      resetForm();
    } catch (err) {
      setError('경력 데이터 저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 수정 모드 전환
  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setFormData({
      project: experience.project,
      company: experience.company,
      companyType: experience.companyType || '',
      client: experience.client || '',
      period: experience.period,
      role: experience.role || '',
      details: experience.details || [],
    });
    setFormMode('edit');
  };

  // 삭제 처리
  const handleDelete = async (id) => {
    if (!window.confirm('정말로 이 경력 정보를 삭제하시겠습니까?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteExperience(id);

      // 로컬 상태에서도 항목 제거 (RLS 오류 무시)
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));

      showSuccessMessage('경력 정보가 성공적으로 삭제되었습니다.');
    } catch (err) {
      setError('경력 데이터 삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 세부 업무 추가
  const handleAddDetail = () => {
    if (!newDetailName) return;

    setFormData({
      ...formData,
      details: [
        ...formData.details,
        {
          name: newDetailName,
          description: newDetailDesc || '',
        },
      ],
    });

    setNewDetailName('');
    setNewDetailDesc('');
  };

  // 세부 업무 삭제
  const handleRemoveDetail = (index) => {
    setFormData({
      ...formData,
      details: formData.details.filter((_, i) => i !== index),
    });

    // 현재 수정 중인 항목이 삭제되면 수정 모드 취소
    if (editingDetailIndex === index) {
      setEditingDetailIndex(-1);
      setEditingDetailName('');
      setEditingDetailDesc('');
    } else if (editingDetailIndex > index) {
      // 삭제된 항목 위치보다 아래에 있던 항목을 수정 중이었다면 인덱스 조정
      setEditingDetailIndex(editingDetailIndex - 1);
    }
  };

  // 세부 업무 수정 모드 진입
  const handleEditDetail = (index) => {
    const detail = formData.details[index];
    setEditingDetailIndex(index);
    setEditingDetailName(detail.name);
    setEditingDetailDesc(detail.description || '');
  };

  // 세부 업무 수정 취소
  const handleCancelEditDetail = () => {
    setEditingDetailIndex(-1);
    setEditingDetailName('');
    setEditingDetailDesc('');
  };

  // 세부 업무 수정 저장
  const handleSaveDetail = () => {
    if (!editingDetailName) return;

    const updatedDetails = [...formData.details];
    updatedDetails[editingDetailIndex] = {
      name: editingDetailName,
      description: editingDetailDesc || '',
    };

    setFormData({
      ...formData,
      details: updatedDetails,
    });

    setEditingDetailIndex(-1);
    setEditingDetailName('');
    setEditingDetailDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">경력 관리</h1>
        <button
          onClick={() => router.push('/inventory')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          돌아가기
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      {/* 입력 폼 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {formMode === 'add' ? '새 경력 추가' : '경력 정보 수정'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="project">
                프로젝트명 *
              </label>
              <input
                type="text"
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="company">
                회사명 *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="companyType">
                회사 타입
              </label>
              <input
                type="text"
                id="companyType"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="예: 프리랜서, 정규직 등"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="client">
                고객사
              </label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="period">
                기간 *
              </label>
              <input
                type="text"
                id="period"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="예: 2023년 1월 ~ 2023년 12월"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                역할
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          {/* 세부 업무 */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">세부 업무</h3>

            {formData.details.length > 0 && (
              <ul className="mb-4 space-y-2">
                {formData.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex flex-col p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    {editingDetailIndex === index ? (
                      /* 수정 모드 */
                      <div className="space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-medium text-sm">업무명</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleSaveDetail}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              저장
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEditDetail}
                              className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={editingDetailName}
                          onChange={(e) => setEditingDetailName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                        />
                        <label className="font-medium text-sm mt-2">업무 설명</label>
                        <textarea
                          value={editingDetailDesc}
                          onChange={(e) => setEditingDetailDesc(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                          rows="3"
                        ></textarea>
                      </div>
                    ) : (
                      /* 표시 모드 */
                      <>
                        <div className="flex justify-between items-start mb-1">
                          <strong className="font-semibold text-gray-800 dark:text-gray-100 text-base">
                            {detail.name}
                          </strong>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditDetail(index)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveDetail(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                        {detail.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {convertUrlsToLinks(detail.description)}
                          </p>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="newDetailName">
                  업무명
                </label>
                <input
                  type="text"
                  id="newDetailName"
                  value={newDetailName}
                  onChange={(e) => setNewDetailName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  placeholder="예: 프론트엔드 개발"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="newDetailDesc">
                  업무 설명
                </label>
                <textarea
                  id="newDetailDesc"
                  value={newDetailDesc}
                  onChange={(e) => setNewDetailDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  placeholder="예: React와 TypeScript를 사용한 UI 개발"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddDetail}
              className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              세부 업무 추가
            </button>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '처리 중...' : formMode === 'add' ? '추가하기' : '수정하기'}
            </button>

            {formMode === 'edit' && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                취소
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 경력 목록 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">경력 목록</h2>

        {loading && <p className="text-gray-500">데이터 로딩 중...</p>}

        {!loading && experiences.length === 0 && (
          <p className="text-gray-500">등록된 경력 정보가 없습니다.</p>
        )}

        {!loading && experiences.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    프로젝트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    회사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {experiences.map((experience) => (
                  <tr key={experience.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{experience.project}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{experience.company}</div>
                      {experience.companyType && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {experience.companyType}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{experience.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(experience)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(experience.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceAdmin;
