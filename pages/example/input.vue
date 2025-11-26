<template>
    <div class="example-input-page">
        <n-card title="Common Input Form" size="large">
            <n-form ref="formRef" :model="form" :rules="formRules" label-placement="top">
                <div class="form-grid">
                    <common-input-text v-model="form.fullName" label="Full Name" path="fullName"
                        placeholder="Nhập họ tên" required clearable />

                    <common-input-text v-model="form.email" label="Email" path="email" placeholder="example@email.com"
                        type="email" required />

                    <common-input-text v-model="form.phone" label="Số điện thoại" path="phone"
                        placeholder="0900 000 000" required clearable />

                    <common-input-text v-model="form.company" label="Công ty" path="company" placeholder="Tên công ty"
                        required clearable />
                </div>

                <n-space justify="end" class="form-actions">
                    <n-button @click="handleReset">Reset</n-button>
                    <n-button type="primary" @click="handleSubmit">Submit</n-button>
                </n-space>
            </n-form>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
const { createValidator, messageError, errorMessage } = useValidates()

const message = useMessage()
const formRef = ref()

const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    company: ''
})

const validates = {
    fullName: createValidator('fullName', (value: any) => {
        if (!value || value.trim() === '') return 'Vui lòng nhập họ và tên'
        return ''
    }),
    email: createValidator('email', (value: any) => {
        if (!value || value.trim() === '') return 'Vui lòng nhập email'
        return ''
    }),
    phone: createValidator('phone', (value: any) => {
        if (!value || value.trim() === '') return 'Vui lòng nhập số điện thoại'
        return ''
    }),
    company: createValidator('company', (value: any) => {
        if (!value || value.trim() === '') return 'Vui lòng nhập tên công ty'
        return ''
    })
}

const makeRule = (validator: any, require: boolean = true, trigger: string[] = ['blur', 'input']) => {
    return [{ required: require, validator, trigger }]
}

const formRules: FormRules = {
    fullName: makeRule(validates.fullName),
    email: makeRule(validates.email),
    phone: makeRule(validates.phone),
    company: makeRule(validates.company)
}

const handleReset = () => {
    form.fullName = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    formRef.value?.restoreValidation()
}

const handleSubmit = async () => {
    await formRef.value?.validate((errors: unknown) => {
        if (errors) {
            message?.error('Vui lòng kiểm tra lại thông tin!')
        } else {
            console.log(form)
            message?.success('Form submitted!')
            console.log('Form data:', { ...form })

            messageError('fullName', 'Lỗi ko đúng format')
            messageError('email', 'Lỗi ko đúng format')
            messageError('phone', 'Lỗi ko đúng format')
            messageError('company', 'Lỗi ko đúng format')
        }
    })
}
</script>

<style scoped>
.example-input-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
}

.form-actions {
    margin-top: 1.5rem;
}
</style>