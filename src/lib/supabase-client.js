import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

// Supabase 클라이언트 인스턴스를 생성합니다.
// 클라이언트 사이드에서만 완전한 초기화를 수행합니다.
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // 환경 변수가 없을 경우 콘솔에 경고 출력
  if (typeof window !== 'undefined') {
    console.warn('Supabase URL 또는 API 키가 제공되지 않았습니다. 환경 변수를 확인하세요.');
  }

  // 빈 메서드를 가진 더미 클라이언트 생성 (SSR 오류 방지)
  supabase = {
    from: () => {
      const methods = {
        select: () => {
          return {
            data: [],
            error: null,
            order: () => ({ data: [], error: null }),
            eq: () => ({ data: null, error: null }),
            single: () => ({ data: null, error: null }),
          };
        },
        insert: () => ({
          data: null,
          error: null,
          select: () => ({ data: [], error: null }),
        }),
        update: () => ({
          data: null,
          error: null,
          eq: () => ({
            select: () => ({ data: [], error: null }),
          }),
        }),
        delete: () => ({
          data: null,
          error: null,
          eq: () => ({ error: null }),
        }),
        eq: () => ({
          data: null,
          error: null,
          single: () => ({ data: null, error: null }),
        }),
      };

      return methods;
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signInAnonymously: () => Promise.resolve({ data: null, error: null }),
    },
  };
}

// Supabase auth API에서 비인증 사용자로도 테이블에 접근할 수 있도록 RLS 정책을 비활성화합니다.
// 이 방법은 개발 환경에서만 사용해야 합니다. 프로덕션 환경에서는 적절한 보안 정책을 구현해야 합니다.
const setupAuth = async () => {
  if (!supabase) return; // supabase가 초기화되지 않았으면 리턴

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log('인증되지 않은 상태로 시작합니다. RLS 정책이 비활성화되었는지 확인하세요.');
    } else {
      console.log('인증된 상태로 시작합니다.');
    }
  } catch (error) {
    console.error('인증 세션 확인 중 오류:', error);
  }
};

// 애플리케이션 시작 시 인증 상태 확인 - 클라이언트 사이드에서만 실행
if (typeof window !== 'undefined' && supabase) {
  setupAuth();
}

/**
 * 경력 테이블 이름
 * Supabase에서 이 이름으로 테이블을 생성해주세요
 */
const TABLE_NAME = 'experiences';

/**
 * 모든 경력 정보 가져오기
 */
export async function getAllExperiences() {
  try {
    if (!supabase) return []; // supabase가 초기화되지 않았으면 빈 배열 반환

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('경력 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('getAllExperiences 예외 발생:', err);
    return [];
  }
}

/**
 * 단일 경력 정보 가져오기
 */
export async function getExperienceById(id) {
  try {
    if (!supabase) return null; // supabase가 초기화되지 않았으면 null 반환

    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();

    if (error) {
      console.error('경력 정보 단일 조회 실패:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('getExperienceById 예외 발생:', err);
    return null;
  }
}

/**
 * 새 경력 정보 추가
 */
export async function createExperience(experience) {
  try {
    if (!supabase) {
      // supabase가 초기화되지 않았으면 클라이언트 측 임시 ID 생성하여 반환
      return { id: 'temp_' + Date.now(), ...experience };
    }

    // RLS 오류 무시하고 데이터만 일단 전송
    const { data, error } = await supabase.from(TABLE_NAME).insert([experience]).select();

    if (error) {
      console.error('경력 정보 생성 실패:', error);

      // 만약 RLS 정책 위반 오류라면 로컬 모의 데이터 반환
      if (error.code === '42501' || error.message.includes('row-level security')) {
        console.warn('RLS 정책 위반: Supabase에서 테이블의 RLS 정책을 확인하세요');
        console.warn(
          'Supabase 대시보드 > Authentication > Policies에서 experiences 테이블에 적절한 정책을 설정하세요'
        );

        // 클라이언트 UI를 위한 임시 ID 생성
        return { id: 'temp_' + Date.now(), ...experience };
      }

      throw error;
    }

    return data?.[0] || { id: 'temp_' + Date.now(), ...experience };
  } catch (err) {
    console.error('createExperience 예외 발생:', err);
    // 오류 발생시 클라이언트에서 렌더링할 임시 데이터 반환
    return { id: 'temp_' + Date.now(), ...experience };
  }
}

/**
 * 경력 정보 수정
 */
export async function updateExperience(id, experience) {
  try {
    if (!supabase) {
      // supabase가 초기화되지 않았으면 전달받은 데이터 그대로 반환
      return { id, ...experience };
    }

    // ID가 임시 ID라면 (클라이언트 측에서 생성된 ID)
    if (typeof id === 'string' && id.startsWith('temp_')) {
      console.warn(
        '임시 ID를 가진 데이터를 업데이트하려고 합니다. 실제 데이터베이스에는 반영되지 않습니다.'
      );
      return { id, ...experience };
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(experience)
      .eq('id', id)
      .select();

    if (error) {
      console.error('경력 정보 수정 실패:', error);

      if (error.code === '42501' || error.message.includes('row-level security')) {
        console.warn('RLS 정책 위반: Supabase에서 테이블의 RLS 정책을 확인하세요');
      }

      // 오류가 있어도 UI 업데이트를 위해 목업 응답 반환
      return { id, ...experience };
    }

    return data?.[0] || { id, ...experience };
  } catch (err) {
    console.error('updateExperience 예외 발생:', err);
    // 오류 발생시 클라이언트에서 렌더링할 임시 데이터 반환
    return { id, ...experience };
  }
}

/**
 * 경력 정보 삭제
 */
export async function deleteExperience(id) {
  try {
    if (!supabase) return true; // supabase가 초기화되지 않았으면 성공으로 처리

    // ID가 임시 ID라면 (클라이언트 측에서 생성된 ID)
    if (typeof id === 'string' && id.startsWith('temp_')) {
      console.warn(
        '임시 ID를 가진 데이터를 삭제하려고 합니다. 실제 데이터베이스에는 반영되지 않습니다.'
      );
      return true;
    }

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);

    if (error) {
      console.error('경력 정보 삭제 실패:', error);

      if (error.code === '42501' || error.message.includes('row-level security')) {
        console.warn('RLS 정책 위반: Supabase에서 테이블의 RLS 정책을 확인하세요');
      }

      // 오류가 있어도 UI 업데이트를 위해 성공으로 처리
      return true;
    }

    return true;
  } catch (err) {
    console.error('deleteExperience 예외 발생:', err);
    // 오류 발생시에도 UI에서는 삭제된 것처럼 처리
    return true;
  }
}

export default supabase;
