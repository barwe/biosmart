<script setup lang="ts">
import { adminApi } from '@/api'

const show = ref(false)

const props = defineProps<{ role: RoleRecord; users: DrfUser[] }>()

const { data: checked, reset } = computableRef(
  () => {
    const data: SBRecord = {}
    props.users.forEach(d => (data[d.id] = false))
    props.role.users.forEach(i => (data[i] = true))
    return data
  },
  {},
  { cloneDeep: true }
)

const submit = async () => {
  const users = keys(checked.value)
    .filter(k => checked.value[k])
    .map(x => parseInt(x))
  try {
    await adminApi.updateRoleUsers(props.role.id, users)
    show.value = false
  } catch {
    reset()
  }
}
</script>

<template>
  <div>
    <n-button type="info" size="small" @click="show = true">用户 ({{ role.users.length }})</n-button>
    <n-modal v-model:show="show">
      <n-card title="设置关联用户" class="w-[640px]">
        <div class="fx-l flex-wrap sx-4">
          <div class="fx-l sx-2" v-for="d in users" :key="d.id">
            <n-checkbox v-model:checked="checked[d.id]" />
            <span>{{ d.username }}</span>
          </div>
        </div>
        <template #footer>
          <div class="fx-c">
            <n-button type="primary" @click="submit">确定</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
