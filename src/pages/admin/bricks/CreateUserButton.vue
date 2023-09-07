<script setup lang="ts">
import { userApi } from '@/api'
import { isInvalidForm } from '@/utils/form'

const show = ref(false)
const formRef = ref<FormInst>()
const form = ref({
  username: '',
  email: '',
  password: '',
  is_active: true,
  is_staff: false,
  is_superuser: false,
  first_name: '',
  last_name: '',
})
const rules: FormRules = {
  username: { required: true, message: '用户名不能为空' },
  email: { required: true, message: '邮箱不能为空' },
  password: { required: true, message: '密码不能为空' },
}
const submit = async () => {
  if (await isInvalidForm(formRef)) return
  userApi.create(form.value).then(() => {
    $message.success(`成功创建用户 ${form.value.username}`)
    show.value = false
    reload()
  })
}
</script>

<template>
  <div>
    <n-button type="primary" @click="show = true">新建用户</n-button>
    <n-modal v-model:show="show">
      <n-card title="新建用户" class="w-640px">
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" :label-width="120">
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="form.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="form.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input type="password" v-model:value="form.password" placeholder="请输入密码" />
          </n-form-item>
          <n-form-item label="First Name">
            <n-input v-model:value="form.first_name" placeholder="" />
          </n-form-item>
          <n-form-item label="Last Name">
            <n-input v-model:value="form.last_name" placeholder="" />
          </n-form-item>
          <n-form-item label="是否启用" :show-feedback="false">
            <n-switch v-model:value="form.is_active" />
          </n-form-item>
          <n-form-item label="设为管理员" :show-feedback="false">
            <n-switch v-model:value="form.is_staff" />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="fx-c">
            <n-button type="primary" @click="submit">提交</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
