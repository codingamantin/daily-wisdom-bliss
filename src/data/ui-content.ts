import content from "./ui-content.json";

type UiContent = {
  header: {
    brand: string;
    title: string;
    toggleThemeLabel: string;
  };
  greetings: {
    night: string;
    morning: string;
    afternoon: string;
    evening: string;
  };
  index: {
    introLabel: string;
    introTitle: string;
    introBody: string;
    completeLabel: string;
    completeTitle: string;
    completeBody: string;
    reset: string;
    openToday: string;
    openedLabel: string;
    openedBody: string;
    progress: string;
  };
  onboarding: {
    label: string;
    title: string;
    body: string;
    nameLabel: string;
    namePlaceholder: string;
    submit: string;
  };
  notFound: {
    title: string;
    body: string;
    backHome: string;
  };
};

export const uiContent = content as UiContent;
