<script setup lang="ts">
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'vue3-dnd'

const props = defineProps<{
  id: number | string | symbol
  text?: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}>()

interface DragItem {
  id: string
  index: number
  type: string
}

const card = ref<HTMLDivElement>()

const [collect, drag] = useDrag({
  type: 'card',
  item: () => ({ id: props.id, index: props.index }),
  collect: monitor => ({ isDragging: monitor.isDragging() }),
})

const [dropCollect, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
  accept: 'card',
  collect: monitor => ({ handlerId: monitor.getHandlerId() }),
  hover: (item, monitor) => {
    if (!card.value) return
    const dragIndex = item.index
    const hoverIndex = props.index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return
    // Determine rectangle on screen
    const hoverBoundingRect = card.value.getBoundingClientRect()
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    // Determine mouse position
    const clientOffset = monitor.getClientOffset()
    // Get pixels to the top
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // eslint-disable-next-line no-param-reassign
    item.index = hoverIndex
  },
})

const handlerId = computed(() => dropCollect.value.handlerId)
const isDragging = computed(() => collect.value.isDragging)
const opacity = computed(() => (isDragging.value ? 0 : 1))
const setRef = (el: HTMLDivElement) => (card.value = drag(drop(el)))
</script>

<template>
  <div :ref="setRef as any" :style="{ opacity }" :data-handler-id="handlerId" mb="2">
    <div class="flex">
      <slot>
        <n-tag size="large" w="full" ml="[-1px]" class="cursor-move overflow-hidden">
          {{ text }}
        </n-tag>
      </slot>
    </div>
  </div>
</template>
