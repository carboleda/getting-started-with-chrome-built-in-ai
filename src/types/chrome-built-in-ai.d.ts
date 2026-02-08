// Type definitions for Chrome Built-in AI APIs
// These are experimental APIs subject to change

interface LanguageDetectionProgressEvent extends Event {
  readonly type: "downloadprogress";
  readonly loaded: number;
}

interface LanguageDetectionMonitor extends EventTarget {
  addEventListener(
    type: "downloadprogress",
    listener: (event: LanguageDetectionProgressEvent) => void,
    options?: AddEventListenerOptions | boolean,
  ): void;
}

interface LanguageDetectorCreateOptions {
  monitor?: (monitor: LanguageDetectionMonitor) => void;
}

interface LanguageDetectorResult {
  detectedLanguage: string;
  confidence: number;
}

interface LanguageDetector {
  static availability(): Promise<string>;
  create(options?: LanguageDetectorCreateOptions): Promise<LanguageDetector>;
  capabilities(): Promise<{
    available: "readily" | "after-download" | "no";
    defaultTopK?: number;
    maxTopK?: number;
  }>;
  detect(text: string): Promise<LanguageDetectorResult[]>;
  destroy(): void;
}


export interface LanguageModelProgressEvent extends Event {
  readonly type: "downloadprogress";
  readonly loaded: number;
}

export interface LanguageModelMonitor extends EventTarget {
  addEventListener(
    type: "downloadprogress",
    listener: (event: LanguageModelProgressEvent) => void,
    options?: AddEventListenerOptions | boolean,
  ): void;
}

type LanguageModelRole = "system" | "user" | "assistant";

interface LanguageModelPrompt {
  role: LanguageModelRole;
  content: string;
}

export interface LanguageModelCreateOptions {
  initialPrompts?: LanguageModelPrompt[];
  monitor?: (monitor: LanguageModelMonitor) => void;
}

export interface LanguageModelAPI {
  static availability(): Promise<string>;
  prompt(prompt: string, options?: PromptOptions): Promise<string>;
  destroy(): void;
  create(options?: LanguageModelCreateOptions): Promise<LanguageModelAPI>;
  capabilities(): Promise<{
    available: "readily" | "after-download" | "no";
  }>;
}

// Extend the Window interface to include Chrome Built-in AI APIs
declare global {
  interface Window {
    LanguageDetector?: LanguageDetector;
    LanguageModel?: LanguageModelAPI;
  }
  
  type PromptOptions = {
    responseConstraint: any,
  };

  // Also available as globals
  const LanguageDetector: LanguageDetector | undefined;
  const LanguageModel: LanguageModelAPI | undefined;
}

export {};
