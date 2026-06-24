import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type MicroCMSPost = {
  id: string;
  title: string;
  date: string;
  description?: string;
  updatedDate?: string;
  tags: string[];
  draft?: boolean;
  image?: MicroCMSImage;
  body: string;
};

export type MicroCMSStatus = {
  emoji?: string;
  message: string;
};

export type MicroCMSCityMinePost = {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  draft?: boolean;
  image?: MicroCMSImage;
  body: string;
};

export type MicroCMSNews = {
  id: string;
  date: string;
  message: string;
};
