-- RLS 활성화 (이미 활성화되어 있을 수 있음)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거 (충돌 방지)
DROP POLICY IF EXISTS "Allow anonymous read" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated insert" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated update" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated delete" ON experiences;

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