export {};

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendScrap: (options: { requestUrl: string }) => void;
        sendDefault: (options: string) => void;
      };
    };
  }
}
