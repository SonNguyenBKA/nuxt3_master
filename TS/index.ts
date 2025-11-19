/**
 * GIẢI THÍCH: await next() trong Middleware Pattern
 * 
 * next() là callback để CHUYỂN QUYỀN ĐIỀU KHIỂN cho middleware tiếp theo
 * await để ĐỢI middleware tiếp theo chạy XONG rồi mới tiếp tục
 */

// ============================================
// VÍ DỤ 1: Hiểu cơ bản về next()
// ============================================

type Context = {
  logs: string[]
  userId?: number
}

type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>

// Middleware 1: Log trước khi xử lý
const logBefore: Middleware = async (ctx, next) => {
  ctx.logs.push('1. Bắt đầu xử lý...')
  
  // Gọi next() để chuyển quyền cho middleware tiếp theo
  await next() // ⭐ ĐỢI middleware tiếp theo chạy XONG
  
  // Code này sẽ chạy SAU KHI middleware tiếp theo hoàn thành
  ctx.logs.push('4. Hoàn thành xử lý!')
}

// Middleware 2: Xử lý logic chính
const processData: Middleware = async (ctx, next) => {
  ctx.logs.push('2. Đang xử lý dữ liệu...')
  ctx.userId = 42
  
  await next() // Chuyển cho middleware tiếp theo
  
  ctx.logs.push('3. Đã xử lý xong dữ liệu')
}

// Middleware 3: Kết thúc
const finish: Middleware = async (ctx) => {
  ctx.logs.push('2.5. Middleware cuối cùng chạy')
  // Không gọi next() vì đây là middleware cuối
}

// ============================================
// VÍ DỤ 2: So sánh CÓ và KHÔNG có await next()
// ============================================

// Ví dụ minh họa (đã comment để tránh lỗi linter)
// console.log('\n=== VÍ DỤ: CÓ await next() ===')
// const ctx1: Context = { logs: [] }

// Giả lập pipeline đơn giản
// async function runWithAwait() {
//   console.log('Middleware 1: Bắt đầu')
//   
//   await (async () => {
//     console.log('Middleware 2: Đang xử lý...')
//     // Giả lập await next() - đợi middleware tiếp theo
//     await new Promise(resolve => setTimeout(resolve, 100))
//     console.log('Middleware 2: Hoàn thành')
//   })()
//   
//   console.log('Middleware 1: Kết thúc')
// }

// runWithAwait()
// Output:
// Middleware 1: Bắt đầu
// Middleware 2: Đang xử lý...
// Middleware 2: Hoàn thành  ← Đợi xong mới chạy
// Middleware 1: Kết thúc

// console.log('\n=== VÍ DỤ: KHÔNG có await next() ===')
// async function runWithoutAwait() {
//   console.log('Middleware 1: Bắt đầu')
//   
//   // Không await - chạy song song
//   (async () => {
//     console.log('Middleware 2: Đang xử lý...')
//     await new Promise(resolve => setTimeout(resolve, 100))
//     console.log('Middleware 2: Hoàn thành')
//   })()
//   
//   console.log('Middleware 1: Kết thúc') // ← Chạy NGAY, không đợi
// }

// runWithoutAwait()
// Output:
// Middleware 1: Bắt đầu
// Middleware 2: Đang xử lý...
// Middleware 1: Kết thúc  ← Chạy TRƯỚC khi middleware 2 xong!
// Middleware 2: Hoàn thành

// ============================================
// VÍ DỤ 3: Ứng dụng thực tế - Timing Control
// ============================================

/**
 * Tại sao cần await next()?
 * 
 * 1. THỨ TỰ THỰC THI:
 *    - Có await: Middleware 1 → Middleware 2 → ... → Quay lại Middleware 1
 *    - Không await: Middleware 1 chạy song song với Middleware 2
 * 
 * 2. XỬ LÝ SAU KHI HOÀN THÀNH:
 *    - Có await: Có thể log, cleanup SAU KHI tất cả middleware chạy xong
 *    - Không await: Không biết khi nào middleware tiếp theo xong
 * 
 * 3. ERROR HANDLING:
 *    - Có await: Có thể catch lỗi từ middleware tiếp theo
 *    - Không await: Không catch được lỗi
 */

const timingExample: Middleware = async (ctx, next) => {
  const startTime = Date.now()
  ctx.logs.push(`[${startTime}] Bắt đầu`)
  
  try {
    await next() // Đợi tất cả middleware tiếp theo chạy xong
    
    const endTime = Date.now()
    const duration = endTime - startTime
    ctx.logs.push(`[${endTime}] Kết thúc - Tổng thời gian: ${duration}ms`)
  } catch (error) {
    ctx.logs.push(`Lỗi: ${error}`)
    throw error
  }
}

// ============================================
// VÍ DỤ 4: Thực tế trong Nuxt/Express
// ============================================

/**
 * Trong Nuxt middleware hoặc Express:
 * 
 * export default defineNuxtRouteMiddleware((to, from) => {
 *   console.log('Before navigation')
 *   // next() được gọi tự động bởi Nuxt
 *   // Bạn không cần viết await next() nhưng Nuxt làm điều đó
 * })
 * 
 * Trong Express:
 * app.use((req, res, next) => {
 *   console.log('Before')
 *   next() // Chuyển cho middleware tiếp theo
 *   console.log('After') // Chạy SAU KHI middleware tiếp theo xong
 * })
 */

// ============================================
// TÓM TẮT:
// ============================================

/**
 * await next() có 2 chức năng:
 * 
 * 1. CHUYỂN QUYỀN: Cho middleware tiếp theo chạy
 * 2. ĐỢI HOÀN THÀNH: Đợi middleware tiếp theo chạy XONG rồi mới tiếp tục
 * 
 * → Cho phép bạn:
 *    - Xử lý TRƯỚC khi middleware tiếp theo chạy
 *    - Xử lý SAU KHI middleware tiếp theo chạy xong
 *    - Kiểm soát thứ tự và timing chính xác
 */

// ============================================
// VÍ DỤ THỰC TẾ: API Request Handler Pipeline
// ============================================

/**
 * Mô phỏng một API request handler với middleware pipeline
 * Giống như Express.js, Koa.js, hoặc Nuxt middleware
 */

// ===== 1. Định nghĩa Types =====
type RequestContext = {
  // Request data
  method: string
  path: string
  headers: Record<string, string>
  body?: Record<string, unknown>
  query?: Record<string, string>
  
  // Middleware data
  startTime?: number
  userId?: number
  userRole?: string
  requestCount: number
  logs: string[]
  
  // Response data
  statusCode?: number
  response?: unknown
  error?: Error
}

type RequestMiddleware = (
  ctx: RequestContext,
  next: () => Promise<void>
) => Promise<void>

// ===== 2. Middleware Stack Class =====
class MiddlewareStack {
  private middlewares: RequestMiddleware[] = []

  use(middleware: RequestMiddleware) {
    this.middlewares.push(middleware)
  }

  async run(ctx: RequestContext): Promise<void> {
    let index = -1

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }
      index = i
      
      const middleware = this.middlewares[i]
      if (!middleware) {
        return // Hết middleware, kết thúc
      }
      
      await middleware(ctx, () => dispatch(i + 1))
    }

    await dispatch(0)
  }
}

// ===== 3. Các Middleware Thực Tế =====

// Middleware 1: Logging - Ghi log request
const loggingMiddleware: RequestMiddleware = async (ctx, next) => {
  ctx.startTime = Date.now()
  ctx.logs.push(`[${new Date().toISOString()}] ${ctx.method} ${ctx.path}`)
  ctx.logs.push(`Headers: ${JSON.stringify(ctx.headers)}`)
  
  await next() // Chuyển cho middleware tiếp theo
  
  // Sau khi tất cả middleware chạy xong, log response
  const duration = Date.now() - ctx.startTime
  ctx.logs.push(
    `[${new Date().toISOString()}] Response: ${ctx.statusCode || 200} - ${duration}ms`
  )
}

// Middleware 2: Rate Limiting - Giới hạn số request
const rateLimitMiddleware: RequestMiddleware = async (ctx, next) => {
  ctx.requestCount = (ctx.requestCount || 0) + 1
  
  // Giả lập: Nếu quá 10 requests thì block
  if (ctx.requestCount > 10) {
    ctx.statusCode = 429
    ctx.response = { error: 'Too many requests' }
    ctx.logs.push('❌ Rate limit exceeded')
    throw new Error('Rate limit exceeded')
  }
  
  ctx.logs.push(`✅ Rate limit check passed (${ctx.requestCount}/10)`)
  await next()
}

// Middleware 3: Authentication - Kiểm tra token
const authMiddleware: RequestMiddleware = async (ctx, next) => {
  const token = ctx.headers['authorization']
  
  if (!token) {
    ctx.statusCode = 401
    ctx.response = { error: 'Unauthorized: Missing token' }
    ctx.logs.push('❌ Authentication failed: No token')
    throw new Error('Unauthorized')
  }
  
  // Giả lập: Validate token (trong thực tế sẽ decode JWT, check DB...)
  if (token !== 'Bearer valid-token-123') {
    ctx.statusCode = 401
    ctx.response = { error: 'Unauthorized: Invalid token' }
    ctx.logs.push('❌ Authentication failed: Invalid token')
    throw new Error('Unauthorized')
  }
  
  // Set user info
  ctx.userId = 42
  ctx.userRole = 'admin'
  ctx.logs.push(`✅ Authenticated as user ${ctx.userId} (${ctx.userRole})`)
  
  await next()
}

// Middleware 4: Validation - Validate request body
const validationMiddleware: RequestMiddleware = async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.body) {
    // Validate: body phải có field 'name'
    if (!ctx.body.name || typeof ctx.body.name !== 'string') {
      ctx.statusCode = 400
      ctx.response = { error: 'Validation failed: name is required' }
      ctx.logs.push('❌ Validation failed: Missing name field')
      throw new Error('Validation failed')
    }
    
    ctx.logs.push(`✅ Validation passed: ${ctx.body.name}`)
  }
  
  await next()
}

// Middleware 5: Authorization - Kiểm tra quyền truy cập
const authorizationMiddleware: RequestMiddleware = async (ctx, next) => {
  // Chỉ admin mới được truy cập /admin
  if (ctx.path.startsWith('/admin') && ctx.userRole !== 'admin') {
    ctx.statusCode = 403
    ctx.response = { error: 'Forbidden: Admin access required' }
    ctx.logs.push('❌ Authorization failed: Not admin')
    throw new Error('Forbidden')
  }
  
  ctx.logs.push('✅ Authorization passed')
  await next()
}

// Middleware 6: Handler - Xử lý logic chính
const handlerMiddleware: RequestMiddleware = async (ctx) => {
  // Đây là nơi xử lý logic chính của API
  ctx.logs.push('🔄 Processing request...')
  
  // Giả lập xử lý (trong thực tế: query DB, call external API...)
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Tạo response
  ctx.statusCode = 200
  ctx.response = {
    success: true,
    message: `Hello ${ctx.body?.name || 'User'}!`,
    userId: ctx.userId,
    timestamp: new Date().toISOString()
  }
  
  ctx.logs.push('✅ Request processed successfully')
}

// ===== 4. Tạo và Chạy Pipeline =====
export async function runExample() {
  console.log('\n' + '='.repeat(60))
  console.log('VÍ DỤ THỰC TẾ: API Request Handler với Middleware Pipeline')
  console.log('='.repeat(60) + '\n')
  
  // Tạo middleware stack
  const pipeline = new MiddlewareStack()
  
  // Đăng ký các middleware theo thứ tự
  pipeline.use(loggingMiddleware)
  pipeline.use(rateLimitMiddleware)
  pipeline.use(authMiddleware)
  pipeline.use(validationMiddleware)
  pipeline.use(authorizationMiddleware)
  pipeline.use(handlerMiddleware)
  
  // ===== Test Case 1: Request thành công =====
  console.log('📝 TEST CASE 1: Request thành công\n')
  
  const ctx1: RequestContext = {
    method: 'POST',
    path: '/api/users',
    headers: {
      'authorization': 'Bearer valid-token-123',
      'content-type': 'application/json'
    },
    body: {
      name: 'John Doe'
    },
    requestCount: 5,
    logs: []
  }
  
  try {
    await pipeline.run(ctx1)
    console.log('✅ Response:', JSON.stringify(ctx1.response, null, 2))
    console.log('\n📋 Logs:')
    ctx1.logs.forEach(log => console.log('  ', log))
  } catch (error) {
    console.log('❌ Error:', (error as Error).message)
  }
  
  console.log('\n' + '-'.repeat(60) + '\n')
  
  // ===== Test Case 2: Request thiếu token =====
  console.log('📝 TEST CASE 2: Request thiếu token (Authentication failed)\n')
  
  const ctx2: RequestContext = {
    method: 'POST',
    path: '/api/users',
    headers: {},
    body: {
      name: 'Jane Doe'
    },
    requestCount: 1,
    logs: []
  }
  
  try {
    await pipeline.run(ctx2)
  } catch (error) {
    console.log('❌ Error:', (error as Error).message)
    console.log('📋 Response:', JSON.stringify(ctx2.response, null, 2))
    console.log('\n📋 Logs:')
    ctx2.logs.forEach(log => console.log('  ', log))
  }
  
  console.log('\n' + '-'.repeat(60) + '\n')
  
  // ===== Test Case 3: Request thiếu validation =====
  console.log('📝 TEST CASE 3: Request thiếu field name (Validation failed)\n')
  
  const ctx3: RequestContext = {
    method: 'POST',
    path: '/api/users',
    headers: {
      'authorization': 'Bearer valid-token-123'
    },
    body: {}, // Thiếu field 'name'
    requestCount: 2,
    logs: []
  }
  
  try {
    await pipeline.run(ctx3)
  } catch (error) {
    console.log('❌ Error:', (error as Error).message)
    console.log('📋 Response:', JSON.stringify(ctx3.response, null, 2))
    console.log('\n📋 Logs:')
    ctx3.logs.forEach(log => console.log('  ', log))
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('✨ Kết thúc ví dụ!')
  console.log('='.repeat(60) + '\n')
}

// ===== 5. Chạy ví dụ =====
// Bỏ comment dòng dưới để chạy:
// runExample().catch(console.error)

// Hoặc chạy trong browser console hoặc Node.js với tsx:
// npx tsx TS/index.ts

