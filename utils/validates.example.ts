/**
 * Ví dụ sử dụng validates utilities
 * 
 * File này minh họa các cách sử dụng validates trong dự án
 */

import { validates, toFormRule, createFormRules, type ValidationContext } from './validates'
import type { FormRules, FormItemRule } from 'naive-ui'

// ============================================
// CÁCH 1: Sử dụng trực tiếp với toFormRule
// ============================================

export const example1: FormRules = {
  email: [
    toFormRule(validates.email, { label: 'Email' })
  ],
  fullName: [
    toFormRule(validates.required, { label: 'Họ tên', message: 'Vui lòng nhập họ tên' })
  ],
  password: [
    toFormRule(validates.required, { label: 'Mật khẩu' }),
    toFormRule(validates.minLength(8), { label: 'Mật khẩu' })
  ]
}

// ============================================
// CÁCH 2: Sử dụng createFormRules (gọn hơn)
// ============================================

export const example2 = createFormRules({
  email: {
    validators: [validates.email],
    ctx: { label: 'Email' }
  },
  fullName: {
    validators: [validates.required],
    ctx: { label: 'Họ tên', message: 'Vui lòng nhập họ tên' }
  },
  password: {
    validators: [
      validates.required,
      validates.minLength(8)
    ],
    ctx: { label: 'Mật khẩu' },
    trigger: ['blur'] // Custom trigger
  }
})

// ============================================
// CÁCH 3: Tạo base rules và extend (kế thừa)
// ============================================

// Base rules cho form liên hệ
const baseContactRules = createFormRules({
  fullName: {
    validators: [validates.required],
    ctx: { label: 'Họ tên' }
  },
  email: {
    validators: [validates.email],
    ctx: { label: 'Email' }
  },
  phone: {
    validators: [validates.required],
    ctx: { label: 'Số điện thoại' }
  }
})

// Extend base rules cho form đăng ký
export const registrationFormRules: FormRules = {
  ...baseContactRules,
  password: [
    toFormRule(validates.required, { label: 'Mật khẩu' }),
    toFormRule(validates.minLength(8), { label: 'Mật khẩu' })
  ],
  confirmPassword: [
    toFormRule(validates.required, { label: 'Xác nhận mật khẩu' })
  ]
}

// Extend base rules cho form hỗ trợ
export const supportFormRules: FormRules = {
  ...baseContactRules,
  ...createFormRules({
    subject: {
      validators: [validates.required, validates.maxLength(200)],
      ctx: { label: 'Tiêu đề' }
    },
    message: {
      validators: [validates.required, validates.maxLength(1000)],
      ctx: { label: 'Nội dung' }
    }
  })
}

// ============================================
// CÁCH 4: Sử dụng trong component Vue
// ============================================

/*
<script setup lang="ts">
import { validates, toFormRule } from '~/utils/validates'
import type { FormRules } from 'naive-ui'

const form = reactive({
  email: '',
  password: ''
})

const formRules: FormRules = {
  email: [
    toFormRule(validates.email, { label: 'Email' })
  ],
  password: [
    toFormRule(validates.required, { label: 'Mật khẩu' }),
    toFormRule(validates.minLength(8), { label: 'Mật khẩu' })
  ]
}
</script>
*/

// ============================================
// CÁCH 5: Custom validator với context
// ============================================

// Tạo custom validator function
const customPhoneValidator = (value: string, ctx?: ValidationContext<string>) => {
  if (!value) {
    return true // Skip nếu empty, để required rule xử lý
  }
  
  const phoneRegex = /^0\d{9}$/
  if (!phoneRegex.test(value)) {
    return ctx?.message || 'Số điện thoại không hợp lệ'
  }
  
  return true
}

export const exampleWithCustomValidator: FormRules = {
  phone: [
    toFormRule(validates.required, { label: 'Số điện thoại' }),
    toFormRule(customPhoneValidator, { label: 'Số điện thoại' })
  ]
}

// ============================================
// CÁCH 6: Validator với async (Promise)
// ============================================

const asyncEmailExistsValidator = async (
  value: string,
  ctx?: ValidationContext<string>
): Promise<true | Error | string> => {
  if (!value) {
    return true
  }
  
  // Giả lập API call
  const exists = await checkEmailExists(value)
  
  if (exists) {
    return ctx?.message || 'Email đã được sử dụng'
  }
  
  return true
}

// Mock function
async function checkEmailExists(email: string): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => resolve(email === 'test@example.com'), 500)
  })
}

export const exampleWithAsyncValidator: FormRules = {
  email: [
    toFormRule(validates.email, { label: 'Email' }),
    toFormRule(asyncEmailExistsValidator, { label: 'Email' })
  ]
}

