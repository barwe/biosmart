<script setup lang="ts">
import { roleApi, permissionApi } from '@/api'
import { getUpdatedSubObject } from '@/utils/object'
import CreatePermission from './bricks/CreatePermission.vue'
import PermissionDataTable from './bricks/PermissionDataTable.vue'

const TRANSLATIONS: SSRecord = {
  user: 'User',
}

const BREADCRUMB_PREFIX = [
  { title: '权限', route: '' },
  { title: '角色', route: '/admin/roles' },
]
breadcrumb.set([...BREADCRUMB_PREFIX, '...'])

const route = useRoute()
const roleId = parseInt(route.params.id as string)
const { data: role } = useRequest(async () => {
  const fields = ['id', 'name']
  const rd = await roleApi.retrieve(roleId, { fields })
  breadcrumb.set([...BREADCRUMB_PREFIX, rd.name])
  return rd
})

const dataList = ref<PermissionRecord[]>([])

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
      tab: TRANSLATIONS[modelName],
      name: modelName,
      modelId: perms[0].model_id,
      data: perms,
    }
  })
})

const tab = ref('')
const tabModelId = computed(() => tabdata.value.find(d => d.name === tab.value)?.modelId)

useRequest(async () => {
  const list = await permissionApi.list({ Q_role: 1 })
  list.forEach(d => (d._raw = cloneDeep(d)))
  dataList.value = list
  if (tabdata.value.length > 0) tab.value = tabdata.value[0].name
})

const { data: resourceList } = useRequest(() => permissionApi.getResourceOptions())

const save = (row: PermissionRecord) => {
  const allowed = ['can_view', 'can_edit', 'can_delete']
  const updated = getUpdatedSubObject(pick(row, allowed), pick(row._raw, allowed))
  if (isEmpty(updated)) return
  if (!row.can_view && (row.can_edit || row.can_delete)) {
    updated.can_edit = false
    updated.can_delete = false
    $message.warning('查看权限关闭时，编辑和删除权限将被强制关闭')
    setTimeout(() => permissionApi.update(row.id, updated), 500)
    return
  }
  permissionApi.update(row.id, updated, '更新成功').then(reload)
}

const create = async (data: Partial<PermissionRecord>) => {
  const rd = await permissionApi.create(data, '创建成功')
  dataList.value.push(rd)
  reload()
}

const destroy = (row: PermissionRecord) => {
  const message = `成功删除 ${role.value?.name} - ${row.model_name}.${row.object_name}`
  permissionApi.destroy(row.id, message).then(reload)
}
</script>

<template>
  <div>
    <n-tabs v-model:value="tab" type="card">
      <template v-for="td in tabdata" :key="td.tabid">
        <n-tab-pane :tab="td.tab" :name="td.name">
          <PermissionDataTable :data-list="td.data" @save="save" @destroy="destroy" />
        </n-tab-pane>
      </template>
    </n-tabs>
    <CreatePermission
      :default-model="tabModelId"
      :resource-list="resourceList"
      @submit="d => create({ ...d, role: roleId })"
      class="absolute top-6px right-6px"
    />
  </div>
</template>
