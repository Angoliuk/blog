import { googleNewsParserTask, parseGoogleNews } from "./google-news-parser";

export const init = () => {
  void parseGoogleNews();
  googleNewsParserTask.start();
};
