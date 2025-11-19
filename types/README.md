# Types

Thư mục này chứa các TypeScript type definitions và interfaces.

**Ví dụ:**
```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
}

// types/index.ts
export * from './user'
```

Sử dụng:
```typescript
import type { User } from '~/types'
```

Xem thêm: https://nuxt.com/docs/guide/directory-structure/types

