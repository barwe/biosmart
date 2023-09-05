<script setup lang="ts">
import { isInvalidForm } from '@/utils/form'
// interface Props {}
// const props = defineProps<Props>()
// const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['submit'])

const show = ref(false)

const formRef = ref<FormInst>()
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
  is_active: true,
  is_staff: false,
  is_superuser: false,
  first_name: '',
  last_name: '',
})

const rules: FormRules = {
  username: [{ required: true, message: '用户名不能为空' }],
  email: { required: true, message: '邮箱不能为空' },
  password: { required: true, message: '密码不能为空' },
}

const submit = async () => {
  if (await isInvalidForm(formRef)) return
  emit('submit', omit(form.value, ['confirmedPassword']))
  show.value = false
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
          <!-- <n-form-item label="确认密码">
            <n-input type="password" v-model:value="form.confirmedPassword" placeholder="请确认密码" />
          </n-form-item> -->
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
          <n-form-item label="设为超级管理员" :show-feedback="false">
            <n-switch v-model:value="form.is_superuser" />
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
