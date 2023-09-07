<script setup lang="ts">
import { isInvalidForm } from '@/utils/form'

const emit = defineEmits(['submit'])

const formRef = ref<FormInst>()
const show = ref(false)
const form = ref({ password: '' })
const rules: FormRules = { password: { required: true, message: '密码不能为空' } }
const submit = async () => {
  if (await isInvalidForm(formRef)) return
  emit('submit', form.value.password)
  form.value.password = ''
  show.value = false
}
</script>

<template>
  <div>
    <n-button type="warning" size="small" @click="show = true">重置密码</n-button>
    <n-modal v-model:show="show">
      <n-card title="重置密码" class="w-640px">
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" :label-width="120">
          <n-form-item label="密码" path="password">
            <n-input type="password" show-password-on="click" v-model:value="form.password" placeholder="请输入密码" />
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
