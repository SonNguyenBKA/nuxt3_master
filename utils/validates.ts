import type { FormItemRule } from 'naive-ui'

type ValidationResult = true | Error | string

export interface ValidationContext<T = unknown> {
    field?: string
    label?: string
    message?: string
    meta?: Record<string, unknown>
    value?: T
}

export type Validator<T = unknown> = (
    value: T,
    ctx?: ValidationContext<T>
) => ValidationResult | Promise<ValidationResult>

const createError = (fallbackMessage: string, ctx?: ValidationContext): ValidationResult => {
    if (ctx?.message) {
        return ctx.message
    }

    if (ctx?.label) {
        return `${ctx.label}: ${fallbackMessage}`
    }

    return fallbackMessage
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validates = {
    required: <T>(value: T, ctx?: ValidationContext<T>): ValidationResult => {
        const isEmpty =
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '') ||
            (Array.isArray(value) && value.length === 0)

        if (isEmpty) {
            return createError('Trường này là bắt buộc', ctx)
        }

        return true
    },

    email: (value: string, ctx?: ValidationContext<string>): ValidationResult => {
        if (!value) {
            return createError('Email là bắt buộc', {
                ...ctx,
                field: ctx?.field ?? 'email',
            })
        }

        if (!EMAIL_REGEX.test(value)) {
            return createError('Email không hợp lệ', ctx)
        }

        return true
    },

    minLength:
        (min: number): Validator<string> =>
            (value, ctx) => {
                console.log(ctx)
                if (!value) {
                    return true
                }

                if (value.length < min) {
                    return createError(`Tối thiểu ${min} ký tự`, ctx)
                }

                return true
            },

    maxLength:
        (max: number): Validator<string> =>
            (value, ctx) => {
                if (!value) {
                    return true
                }

                if (value.length > max) {
                    return createError(`Tối đa ${max} ký tự`, ctx)
                }

                return true
            },
} as const

export type Validates = typeof validates

/**
 * Helper để convert validates functions thành Naive UI FormItemRule
 * @example
 * ```ts
 * const rules = {
 *   email: toFormRule(validates.email, { label: 'Email' }),
 *   fullName: toFormRule(validates.required, { label: 'Họ tên' })
 * }
 * ```
 */
export function toFormRule<T = unknown>(
    validator: Validator<T>,
    ctx?: ValidationContext<T>,
    trigger: string[] = ['blur', 'input']
): FormItemRule {
    return {
        validator: (_rule: FormItemRule, value: T) => {
            const result = validator(value, ctx)

            // Nếu là Promise, return Promise<void> hoặc throw Error
            if (result instanceof Promise) {
                return result.then(res => {
                    if (res === true) {
                        return // void
                    }
                    if (res instanceof Error) {
                        throw res
                    }
                    throw new Error(String(res))
                }) as Promise<void>
            }

            // Nếu là Error, return Error
            if (result instanceof Error) {
                return result
            }

            // Nếu là string, wrap trong Error
            if (typeof result === 'string') {
                return new Error(result)
            }
            // Nếu là true, validation passed - return void
            return
        },
        trigger
    }
}

/**
 * Helper để tạo form rules từ validates với context
 * @example
 * ```ts
 * const formRules = createFormRules({
 *   email: {
 *     validators: [validates.email],
 *     ctx: { label: 'Email' }
 *   },
 *   fullName: {
 *     validators: [validates.required],
 *     ctx: { label: 'Họ tên' }
 *   },
 *   password: {
 *     validators: [validates.required, validates.minLength(8)],
 *     ctx: { label: 'Mật khẩu' }
 *   }
 * })
 * ```
 */
export function createFormRules(
    rules: Record<
        string,
        {
            validators: Validator[]
            ctx?: ValidationContext
            trigger?: string[]
        }
    >
): Record<string, FormItemRule[]> {
    const result: Record<string, FormItemRule[]> = {}

    for (const [field, { validators, ctx, trigger }] of Object.entries(rules)) {
        result[field] = validators.map(validator =>
            toFormRule(validator, { ...ctx, field }, trigger)
        )
    }

    return result
}