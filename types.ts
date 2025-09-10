export interface HowToItem {
  question: string;
  answer: string;
}

export interface SlideData {
  title: string;
  navTitle: string;
  purpose?: string;
  ideasTitle?: string;
  ideas?: string[];
  duration?: string;
  promptTemplatesTitle?: string;
  promptTemplates?: string[];
  isTtsSlide?: boolean;
  howToContent?: HowToItem[];
}

export interface SlideState {
  prompt: string;
  result: string;
  isLoading: boolean;
  ttsStatus?: string;
  audioUrl?: string;
  isLoadingTts?: boolean;
}
