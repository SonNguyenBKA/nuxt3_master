<template>
  <n-form-item
    :label="label"
    :path="path"
    :show-require-mark="required"
  >
    <n-input
      :id="inputId"
      v-model:value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :maxlength="maxlength"
      :disabled="disabled"
      :clearable="clearable"
      :readonly="readonly"
      :autofocus="autofocus"
      :size="size"
      :round="round"
      :passive="passive"
      :status="status"
      :input-props="inputProps"
      @focus="emit('focus')"
      @blur="emit('blur')"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </n-input>
  </n-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { FormItemRule, FormValidationStatus } from 'naive-ui'

defineOptions({ name: 'CommonInputText' })

const modelValue = defineModel<string>({
  default: ''
})

type InputSize = 'tiny' | 'small' | 'medium' | 'large'
type InputType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'

interface Props {
  /**
   * Form label hiển thị trong n-form-item
   */
  label?: string
  /**
   * Đường dẫn tới field trong schema của form
   */
  path?: string
  /**
   * Placeholder cho input
   */
  placeholder?: string
  /**
   * Max length cho input
   */
  maxlength?: number
  /**
   * Loại input
   */
  type?: InputType
  /**
   * Có phải field bắt buộc hay không
   */
  required?: boolean
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Readonly state
   */
  readonly?: boolean
  /**
   * Tự động focus khi mount
   */
  autofocus?: boolean
  /**
   * Hiển thị nút clear
   */
  clearable?: boolean
  /**
   * Kích thước của input
   */
  size?: InputSize
  /**
   * Hiển thị feedback mặc định
   */
  showFeedback?: boolean
  /**
   * Gợi ý/feedback phụ
   */
  hint?: string
  /**
   * Validation status được control từ bên ngoài
   */
  status?: FormValidationStatus
  /**
   * Bo tròn input
   */
  round?: boolean
  /**
   * Passive mode (dành cho performance)
   */
  passive?: boolean
  /**
   * Custom rule cho n-form-item
   */
  rules?: FormItemRule | FormItemRule[]
  /**
   * Input props custom (pass-through)
   */
  inputProps?: Record<string, unknown>
  /**
   * Custom id (mặc định tự sinh)
   */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Nhập nội dung...',
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  clearable: false,
  showFeedback: false,
  round: false,
  passive: false,
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const inputId = computed(() => props.id ?? useId())
</script>