import React from "react";

const locale = "he-IL";

// type LocaleHook = (...args: unknown[]) => HookAnswer;

interface LocaleConfig {
  [key: string]: string;
}

type LocalTypes = "dateType";

type LocaleHook = (...args: LocalTypes[]) => LocaleConfig;

const useLocale: LocaleHook = (...args) => {
  const localeConfig: LocaleConfig = {
    dateType: locale,
  };

  const answer: LocaleConfig = {};

  if (args && args.length === 1)
    return (answer[args[0]] = localeConfig[args[0]]), answer;
  return answer;
};

export default useLocale;
