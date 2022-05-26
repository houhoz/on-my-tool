import { defineConfig } from 'umi';

export default defineConfig({
  outputPath: 'build',
  theme: {
    '@primary': 'var(--primary)',
    '@background': 'var(--background)',
    '@text': 'var(--text)',
    '@secondText': 'var(--secondText)',
    '@border': 'rgba(151, 151, 151, 0.25)',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/about', component: '@/pages/about' },
  // ],
  fastRefresh: {},
});
