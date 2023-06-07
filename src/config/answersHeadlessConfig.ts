import { HeadlessConfig } from "@yext/search-headless-react";

export const answersHeadlessConfig: HeadlessConfig = {
  apiKey: process.env.API_KEY ?? "",
  experienceKey: process.env.EXPERIENCE_KEY ?? "",
  locale: "en",
  // endpoints: SandboxEndpoints,
};
