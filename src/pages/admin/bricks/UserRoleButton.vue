<script setup lang="ts">
import { userPermissionApi } from '@/api'

const show = ref(false)

const props = defineProps<{ user: DrfUser; roles: RoleRecord[] }>()

const checked = computableRef(() => {
  const data: SBRecord = {}
  props.roles.forEach(d => (data[d.id] = false))
  props.user.user_roles.forEach(d => (data[d.id] = true))
  return data
}, {})

const submit = () => {
  const roles = keys(checked.value)
    .filter(k => checked.value[k])
    .map(x => parseInt(x))
  userPermissionApi.updateRole(props.user.id, roles)
  show.value = false
}
</script>

<template>
  <div>
    <n-button type="info" size="small" @click="show = true">角色</n-button>
    <n-modal v-model:show="show">
      <n-card title="用户角色管理" class="w-[640px]">
        <div class="fx-l flex-wrap sx-4">
          <div class="fx-l sx-2" v-for="d in roles" :key="d.id">
            <n-checkbox v-model:checked="checked[d.id]" />
            <span>{{ d.name }}</span>
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
