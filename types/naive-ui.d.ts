import type {
  DialogApi,
  LoadingBarApi,
  MessageApi,
  NotificationApi
} from 'naive-ui'

declare module '#app' {
  interface NuxtApp {
    $naiveMessage: MessageApi
    $naiveNotification: NotificationApi
    $naiveDialog: DialogApi
    $naiveLoadingBar: LoadingBarApi
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $naiveMessage: MessageApi
    $naiveNotification: NotificationApi
    $naiveDialog: DialogApi
    $naiveLoadingBar: LoadingBarApi
  }
}

export {}

