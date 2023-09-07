<script setup lang="ts">
import { roleApi } from '@/api'
import CreatePermissionButton from './CreatePermissionButton.vue'
import PermissionDataTable from './PermissionDataTable.vue'

const props = defineProps<{ roleId: number }>()

const dataList = ref<PermissionRecord[]>([])
const tab = ref('')
const tabModelId = computed(() => tabdata.value.find(d => d.name === tab.value)?.modelId)
const resourceList = ref()
const dataListByModel = computed(() => {
  const data: SRecord<PermissionRecord[]> = {}
  dataList.value.forEach(perm => {
    if (!has(data, perm.model_name)) data[perm.model_name] = []
    data[perm.model_name].push(perm)
  })
  return data
})
const tabdata = computed(() => {
  return entries(dataListByModel.value).map(([modelName, perms]) => {
    return {
      tab: modelName,
      name: modelName,
      modelId: perms[0].model_id,
      data: perms,
    }
  })
})

useRequest(async () => {
  const rd = await roleApi.listDataPermissions(props.roleId)
  dataList.value = rd.permissions
  resourceList.value = rd.resources
  if (tabdata.value.length > 0) {
    tab.value = tabdata.value[0].name
  }
  return rd
})

const show = ref(false)
</script>

<template>
  <div>
    <n-button type="success" size="small" @click="show = true">数据 ({{ dataList.length }})</n-button>
    <n-modal v-model:show="show">
      <n-card class="w-[98%]">
        <template #header>
          <div class="fx-c justify-between">
            <span>数据权限管理</span>
            <CreatePermissionButton :role-id="roleId" :default-model="tabModelId" :resource-list="resourceList" />
          </div>
        </template>
        <n-tabs v-model:value="tab" type="card">
          <template v-for="td in tabdata" :key="td.tabid">
            <n-tab-pane :tab="td.tab" :name="td.name">
              <PermissionDataTable :data-list="td.data" />
            </n-tab-pane>
          </template>
        </n-tabs>
      </n-card>
    </n-modal>
  </div>
</template>
