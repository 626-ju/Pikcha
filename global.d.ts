export {};

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

interface KakaoSDK {
  init(key: string): void;
  isInitialized(): boolean;
  Share: {
    sendDefault(options: KakaoDefaultTemplate): void;
    sendCustom(options: KakaoCustomTemplate): void;
    sendScrap(options: {
      requestUrl: string;
      templateId?: number;
      templateArgs?: Record<string, string>;
    }): void;
  };
}

// 커스텀 템플릿
interface KakaoCustomTemplate {
  templateId: number; // 카카오 개발자 콘솔에서 발급받은 템플릿 ID
  templateArgs?: Record<string, string>; // 템플릿에서 동적으로 바꿀 값
}
