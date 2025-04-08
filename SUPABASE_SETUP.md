# Supabase 설정 안내

## 1. Supabase 계정 및 프로젝트 설정

1. [Supabase](https://supabase.com/)에 접속하여 계정을 생성하거나 로그인합니다.
2. 새 프로젝트를 생성합니다:
   - 프로젝트 이름: `portfolio-jyg` (원하는 이름으로 변경 가능)
   - 안전한 비밀번호를 설정하세요
   - 가장 가까운 리전을 선택하세요
3. 프로젝트 생성이 완료될 때까지 기다립니다 (약 1-2분 소요).

## 2. 데이터베이스 테이블 생성

프로젝트가 생성되면 다음 테이블을 생성해야 합니다:

1. Supabase 대시보드에서 왼쪽 메뉴의 "Table Editor"를 클릭합니다.
2. "New Table"을 클릭하고 다음 정보로 테이블을 생성합니다:

```sql
-- SQL 에디터에서 실행할 수도 있습니다
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT NOT NULL,
  company TEXT NOT NULL,
  company_type TEXT,
  client TEXT,
  period TEXT NOT NULL,
  role TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 3. 환경 변수 설정

1. Supabase 대시보드에서 "Project Settings" > "API" 메뉴로 이동합니다.
2. 프로젝트 URL과 anon public key를 복사합니다.
3. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-anon-public-key
```

## 4. 인증 설정

테스트 목적으로 인증을 사용하려면:

1. Supabase 대시보드에서 "Authentication" > "Providers" 메뉴로 이동합니다.
2. "Email" 제공자가 활성화되어 있는지 확인하세요.
3. "Users" 메뉴로 이동하여 "Add User"를 클릭해 테스트 계정을 추가합니다:
   - 이메일: test@example.com
   - 비밀번호: password123

## 5. RLS(Row Level Security) 정책 설정 (중요!)

RLS 정책은 데이터베이스 테이블 행에 대한 접근을 제어합니다. Supabase는 기본적으로 모든 테이블에 RLS를 활성화하여 안전하게 보호합니다. 하지만 이로 인해 `new row violates row-level security policy for table "experiences"` 오류가 발생할 수 있습니다.

### 5.1 SQL 에디터에서 RLS 정책 설정

1. Supabase 대시보드에서 "SQL Editor" 메뉴로 이동합니다.
2. 다음 SQL 코드를 실행합니다:

```sql
-- RLS 활성화 (이미 활성화되어 있을 수 있음)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거 (충돌 방지)
DROP POLICY IF EXISTS "Allow anonymous read" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated insert" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated update" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated delete" ON experiences;
DROP POLICY IF EXISTS "Allow anon full access for testing" ON experiences;

-- 익명 사용자에게 읽기 권한 부여
CREATE POLICY "Allow anonymous read"
ON experiences FOR SELECT
TO anon, authenticated
USING (true);

-- 인증된 사용자에게 삽입 권한 부여
CREATE POLICY "Allow authenticated insert"
ON experiences FOR INSERT
TO authenticated
WITH CHECK (true);

-- 인증된 사용자에게 업데이트 권한 부여
CREATE POLICY "Allow authenticated update"
ON experiences FOR UPDATE
TO authenticated
USING (true);

-- 인증된 사용자에게 삭제 권한 부여
CREATE POLICY "Allow authenticated delete"
ON experiences FOR DELETE
TO authenticated
USING (true);

-- 테스트를 위해 모든 사용자에게 모든 권한 부여 (개발 환경에서만 사용)
-- 주의: 실제 프로덕션 환경에서는 이 정책을 사용하지 마세요!
CREATE POLICY "Allow anon full access for testing"
ON experiences FOR ALL
TO anon
USING (true)
WITH CHECK (true);
```

### 5.2 UI를 통한 RLS 정책 설정 (대안)

SQL 에디터 대신 UI를 통해 설정하려면:

1. Supabase 대시보드에서 "Authentication" > "Policies" 메뉴로 이동합니다.
2. "experiences" 테이블을 선택합니다.
3. "New Policy" 버튼을 클릭합니다.
4. "Get started quickly" 옵션 선택 후 다음 정책 추가:
   - "For full access to authenticated users" (인증된 사용자에게 모든 권한)
   - "For full access to everyone" (모든 사용자에게 모든 권한, 개발용)

## 6. 문제 해결

### 6.1 "row-level security policy" 오류가 계속 발생하는 경우

이 오류는 RLS 정책이 테이블에 접근을 거부하고 있다는 의미입니다. 해결 방법:

1. SQL 에디터에서 `rls_policy.sql` 스크립트를 실행했는지 확인하세요.
2. 특히 마지막 정책인 "Allow anon full access for testing"이 적용되었는지 확인하세요.
3. Supabase 인증이 올바르게 설정되었는지 확인하세요.

### 6.2 인증 관련 오류

인증 과정에서 `/auth/v1/token` 또는 `/auth/v1/signup` 관련 오류가 발생하는 경우:

1. "Authentication" > "Providers" 메뉴에서 Email 제공자가 활성화되어 있는지 확인하세요.
2. "Authentication" > "Configuration" 메뉴에서 URL 설정이 올바른지 확인하세요.
3. 방화벽이나 네트워크 설정이 Supabase API에 대한 요청을 차단하고 있지 않은지 확인하세요.

## 7. 테스트 환경에서 RLS 완전 비활성화 (최후의 수단)

RLS가 계속 문제를 일으키고 지금은 개발 환경이라면, RLS를 완전히 비활성화할 수 있습니다:

```sql
-- 주의: 이 설정은 개발 환경에서만 사용하세요!
ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
```

## 8. 클라이언트 설정 확인

`src/lib/supabase-client.js` 파일이 올바르게 구성되어 있고, 환경 변수가 설정되어 있다면 추가 조치가 필요하지 않습니다.
