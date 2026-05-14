<!-- src/views/LoginView.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { http } from '@/utils/http';

// 引入 shadcn-vue 组件
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const router = useRouter();
const authStore = useAuthStore();

// 表单状态
const isLoginMode = ref(true);
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  errorMessage.value = ''; // 切换模式时清空报错
};

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = '邮箱和密码不能为空';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    if (isLoginMode.value) {
      // 执行登录
      const res = await http('/users/login', {
        method: 'POST',
        data: { email: email.value, password: password.value },
      });
      // 保存状态并跳转
      authStore.setAuth(res.token, res.user);
      router.push('/dashboard');
    } else {
      // 执行注册
      await http('/users/register', {
        method: 'POST',
        data: { email: email.value, password: password.value },
      });
      // 注册成功后，自动切换到登录模式
      isLoginMode.value = true;
      errorMessage.value = '注册成功，请登录！';
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl font-bold tracking-tight">
          {{ isLoginMode ? '欢迎回来' : '创建新账号' }}
        </CardTitle>
        <CardDescription>
          {{ isLoginMode ? '输入您的邮箱和密码进入系统' : '填写下方信息完成注册' }}
        </CardDescription>
      </CardHeader>
      
      <CardContent class="space-y-4">
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="text-sm text-red-500 text-center font-medium">
          {{ errorMessage }}
        </div>

        <div class="space-y-2">
          <Label for="email">邮箱</Label>
          <Input id="email" type="email" placeholder="hi@chenchangchao.com" v-model="email" />
        </div>
        <div class="space-y-2">
          <Label for="password">密码</Label>
          <Input id="password" type="password" placeholder="••••••••" v-model="password" />
        </div>
      </CardContent>

      <CardFooter class="flex flex-col space-y-4">
        <Button class="w-full" :disabled="loading" @click="handleSubmit">
          {{ loading ? '处理中...' : (isLoginMode ? '登录' : '注册') }}
        </Button>
        
        <div class="text-sm text-center text-slate-500">
          {{ isLoginMode ? '还没有账号？' : '已有账号？' }}
          <span class="text-blue-600 cursor-pointer hover:underline" @click="toggleMode">
            {{ isLoginMode ? '立即注册' : '返回登录' }}
          </span>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
