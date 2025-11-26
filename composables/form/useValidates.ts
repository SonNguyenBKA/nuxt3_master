import { ref } from 'vue'
import type { InternalRuleItem, Value } from 'async-validator'

export type ValidateCallback = (error?: Error | string) => void
export type ValidateFn = (value: Value, ctx?: { field: string }) => string | null

const errorMessage = ref<Record<string, string[]>>({})

const messageError = (field: string, message: string | string[]) => {
    errorMessage.value[field] = Array.isArray(message) ? message : [message]
}

const clearFieldError = (field: string) => {
    if (errorMessage.value[field]) {
        delete errorMessage.value[field]
    }
}

const createValidator = (field: string, validateFn: ValidateFn) => {
    return (_rule: InternalRuleItem, value: Value, callback: ValidateCallback) => {
        const outerMessage = errorMessage.value[field]?.[0]
        if (outerMessage) {
            callback(new Error(outerMessage))
            return
        }

        const error = validateFn(value, { field })
        if (error) {
            callback(new Error(error))
            return
        }

        callback()
    }
}

export const useFormValidator = () => {
    return {
        errorMessage,
        messageError,
        clearFieldError,
        createValidator,
    }
}
