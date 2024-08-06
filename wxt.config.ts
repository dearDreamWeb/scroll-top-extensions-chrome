import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite(){
    return {
      css:{
        modules:{
          localsConvention: 'camelCase', // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
          scopeBehaviour: 'local',
          generateScopedName: '[local]_[hash:5]',
        }
      }
    }
  }
});
