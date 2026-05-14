<!-- src/views/DashboardView.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { http } from '@/utils/http';

// 引入 shadcn-vue 组件
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const router = useRouter();
const authStore = useAuthStore();

// 从 Pinia 中读取当前登录用户信息
const user = authStore.user;

// 头像状态管理
const avatarTimestamp = ref(Date.now()); // 用于打破浏览器图片缓存
const isUploading = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

// 计算属性：动态生成图片 URL
const avatarUrl = computed(() => {
  if (!user?.id) return '';
  // 注意：这里换成你后端的实际基础地址
  return `http://localhost:3000/api/avatars/${user.id}?t=${avatarTimestamp.value}`;
});

// 触发隐藏的 input 选择文件
const triggerUpload = () => {
  fileInputRef.value?.click();
};

// 处理文件选择与上传
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append('file', file); // 这里的 'file' 对应后端的接收字段

  isUploading.value = true;
  try {
    // 调用我们封装的 fetch，自动附加 Token
    await http('/avatars', {
      method: 'PUT',
      body: formData,
    });
    
    // 上传成功后，更新时间戳，强制 Avatar 重新加载新图片
    avatarTimestamp.value = Date.now();
  } catch (error: any) {
    alert(`头像上传失败: ${error.message}`);
  } finally {
    isUploading.value = false;
    target.value = ''; // 清空 input，以便能够重复选择同一张照片
  }
};

// 退出登录
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="max-w-3xl mx-auto space-y-6">
      
      <!-- 顶部导航 / 欢迎区域 -->
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">控制台</h1>
        <Button variant="outline" @click="handleLogout">退出登录</Button>
      </div>

      <!-- 个人信息卡片 -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle>个人资料</CardTitle>
          <CardDescription>管理您的基础账号信息与头像</CardDescription>
        </CardHeader>
        
        <CardContent class="space-y-8">
          
          <!-- 头像区域 -->
          <div class="flex items-center space-x-6">
            <Avatar class="h-24 w-24 border">
              <AvatarImage :src="avatarUrl" alt="用户头像" />
              <!-- 如果加载失败或没有头像，显示名字的首字母 -->
              <AvatarFallback class="text-2xl bg-slate-100">
                {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
              </AvatarFallback>
            </Avatar>
            
            <div class="space-y-2">
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                ref="fileInputRef" 
                @change="handleFileChange"
              />
              <Button @click="triggerUpload" :disabled="isUploading">
                {{ isUploading ? '上传中...' : '更换头像' }}
              </Button>
              <p class="text-xs text-slate-500">
                支持 JPG, PNG 格式，文件大小不超过 5MB
              </p>
            </div>
          </div>

          <hr class="border-slate-100" />

          <!-- 文本信息区域 -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <Label class="text-slate-500">账号邮箱</Label>
              <div class="font-medium text-slate-900">{{ user?.email }}</div>
            </div>
            <div class="space-y-1">
              <Label class="text-slate-500">角色权限</Label>
              <div>
                <!-- 用一个小徽章展示角色 -->
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="user?.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'">
                  {{ user?.role === 'admin' ? '管理员 (Admin)' : '浏览者 (Viewer)' }}
                </span>
              </div>
            </div>
            <div class="space-y-1">
              <Label class="text-slate-500">用户 ID</Label>
              <div class="font-mono text-sm text-slate-600">{{ user?.id }}</div>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  </div>
</template>