
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/safe/', // 깃허브 페이지 저장소명에 맞게 설정
  build: {
    outDir: 'dist',
  }
});
