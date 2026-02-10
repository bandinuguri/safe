
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 깃허브 페이지 하위 경로 호환성 설정
  build: {
    outDir: 'dist',
  }
});
