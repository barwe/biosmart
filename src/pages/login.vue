<script setup lang="ts">
import { useUserStore } from '@/store/site/user'
import { useWindowSize } from '@vueuse/core'
import { isInvalidForm } from '@/utils/form'

const windowSize = useWindowSize()
const isMobileMedia = computed(() => windowSize.width.value < 500)
const labelPlacement = computed(() => (isMobileMedia.value ? 'top' : 'left'))

const formRef = ref<FormInst>()
const form = reactive({ username: 'admin', password: 'admin1234@admin5678' })
const rules: FormRules = {
  username: { required: true, message: '请输入用户名' },
  password: { required: true, message: '请输入密码' },
}

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const login = async () => {
  if (await isInvalidForm(formRef)) return
  await store.login(form)
  if (store.user) {
    $message.success(`登陆成功! 欢迎回来, ${store.user.username}`, { duration: 1000 })
    const goto$0 = route.query.goto as string | undefined
    const goto = goto$0 ?? '/'
    setTimeout(() => router.push(goto), 250)
  }
}

onKeyStroke('Enter', login)
</script>

<template>
  <div class="w-screen h-screen fx-c">
    <n-card :embedded="!isMobileMedia" :bordered="!isMobileMedia" class="min-w-320px max-w-640px">
      <template #header>
        <div class="fx-c text-2rem my-4">BioSmart</div>
      </template>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :label-placement="labelPlacement"
        :label-width="150"
        :show-require-mark="false"
      >
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" placeholder="" />
        </n-form-item>
        <n-form-item label="密&nbsp;&nbsp;&nbsp;码" path="password">
          <n-input v-model:value="form.password" type="password" show-password-on="click" placeholder="" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="fx-c flex-col sy-2">
          <n-button size="large" type="primary" class="w-120px mb-2" @click="login">确定</n-button>
          <BrLinkText to="/register">还没有账户？点我注册！</BrLinkText>
        </div>
      </template>
    </n-card>
  </div>
</template>
