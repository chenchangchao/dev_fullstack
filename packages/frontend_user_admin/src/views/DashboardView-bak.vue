<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CircleDollarSign,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => {
  const user = authStore.user
  return user?.name || user?.email || 'Admin'
})

const initials = computed(() => {
  const value = displayName.value.trim()
  return value.slice(0, 2).toUpperCase()
})

const metrics = [
  {
    title: '总用户数',
    value: '12,486',
    change: '+12.5%',
    trend: 'up',
    description: '较上月新增 1,386 人',
    icon: Users,
  },
  {
    title: '月度收入',
    value: '¥428,900',
    change: '+8.2%',
    trend: 'up',
    description: '企业套餐贡献 64%',
    icon: CircleDollarSign,
  },
  {
    title: '活跃会话',
    value: '3,274',
    change: '+4.7%',
    trend: 'up',
    description: '近 24 小时在线峰值',
    icon: Activity,
  },
  {
    title: '风险工单',
    value: '18',
    change: '-6.1%',
    trend: 'down',
    description: '高优先级剩余 3 条',
    icon: ShieldCheck,
  },
]

const revenueRows = [
  { name: '企业版订阅', amount: '¥186,240', share: 43, status: '稳定增长' },
  { name: '专业版订阅', amount: '¥124,680', share: 29, status: '转化提升' },
  { name: '增值服务', amount: '¥72,510', share: 17, status: '待扩容' },
  { name: '渠道合作', amount: '¥45,470', share: 11, status: '观察中' },
]

const tasks = [
  { title: '审核 6 家企业实名认证资料', time: '09:30', priority: '高' },
  { title: '跟进华东区续费异常客户', time: '11:00', priority: '中' },
  { title: '整理本周产品使用数据简报', time: '15:00', priority: '中' },
  { title: '复盘登录接口错误率波动', time: '17:30', priority: '高' },
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <aside
      class="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block"
    >
      <div class="flex items-center gap-3 px-2">
        <div class="grid size-10 place-items-center rounded-md bg-slate-950 text-white">
          <LayoutDashboard class="size-5" />
        </div>
        <div>
          <p class="text-sm font-semibold leading-none">User Admin</p>
          <p class="mt-1 text-xs text-slate-500">运营管理后台</p>
        </div>
      </div>

      <nav class="mt-8 space-y-1">
        <a class="flex items-center gap-3 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium">
          <LayoutDashboard class="size-4" />
          数据看板
        </a>
        <a class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600">
          <Users class="size-4" />
          用户管理
        </a>
        <a class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600">
          <ClipboardCheck class="size-4" />
          审核中心
        </a>
        <a class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600">
          <ShieldCheck class="size-4" />
          风险控制
        </a>
      </nav>
    </aside>

    <section class="lg:pl-64">
      <header
        class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:px-8"
      >
        <div class="relative hidden w-full max-w-sm md:block">
          <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input class="h-9 pl-9" placeholder="搜索用户、订单或工单" />
        </div>

        <div class="ml-auto flex items-center gap-3">
          <Button variant="outline" size="icon" aria-label="通知">
            <Bell class="size-4" />
          </Button>
          <div class="hidden text-right sm:block">
            <p class="text-sm font-medium leading-none">{{ displayName }}</p>
            <p class="mt-1 text-xs text-slate-500">系统管理员</p>
          </div>
          <Avatar>
            <AvatarFallback>{{ initials }}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="icon" aria-label="退出登录" @click="logout">
            <LogOut class="size-4" />
          </Button>
        </div>
      </header>

      <div class="space-y-6 p-5 lg:p-8">
        <div class="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p class="text-sm font-medium text-slate-500">Overview</p>
            <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              业务数据看板
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-slate-500">
              汇总用户增长、收入结构、在线活跃和风险处理情况，帮助管理团队快速判断运营状态。
            </p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline">导出报表</Button>
            <Button>新建工单</Button>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card v-for="metric in metrics" :key="metric.title">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium text-slate-500">
                {{ metric.title }}
              </CardTitle>
              <component :is="metric.icon" class="size-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-semibold">{{ metric.value }}</div>
              <div class="mt-2 flex items-center gap-2 text-xs">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium"
                  :class="
                    metric.trend === 'up'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-blue-50 text-blue-700'
                  "
                >
                  <ArrowUpRight v-if="metric.trend === 'up'" class="size-3" />
                  <ArrowDownRight v-else class="size-3" />
                  {{ metric.change }}
                </span>
                <span class="text-slate-500">{{ metric.description }}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>收入构成</CardTitle>
              <CardDescription>按业务线统计当前自然月收入占比</CardDescription>
            </CardHeader>
            <CardContent class="space-y-5">
              <div v-for="row in revenueRows" :key="row.name" class="space-y-2">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm font-medium">{{ row.name }}</p>
                    <p class="text-xs text-slate-500">{{ row.status }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold">{{ row.amount }}</p>
                    <p class="text-xs text-slate-500">{{ row.share }}%</p>
                  </div>
                </div>
                <div class="h-2 rounded-full bg-slate-100">
                  <div
                    class="h-2 rounded-full bg-slate-950"
                    :style="{ width: `${row.share}%` }"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>今日待办</CardTitle>
              <CardDescription>需要运营和客服团队协同处理</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <div
                v-for="task in tasks"
                :key="task.title"
                class="flex items-start justify-between gap-3 rounded-md border border-slate-200 p-3"
              >
                <div>
                  <p class="text-sm font-medium leading-5">{{ task.title }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ task.time }}</p>
                </div>
                <span
                  class="rounded-full px-2 py-1 text-xs font-medium"
                  :class="
                    task.priority === '高'
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-slate-100 text-slate-600'
                  "
                >
                  {{ task.priority }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </main>
</template>
