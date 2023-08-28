await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts/feed",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

// https://github.com/vercel/next.js/discussions/15341#discussioncomment-5700982
// Workaround to run init for Next
const initServices = async () => {
  return fetch("http://localhost:3000/api/_init")
    .then(() => {
      return true;
    })
    .catch(() => false);
};

// eslint-disable-next-line import/no-anonymous-default-export
const preparedNext = () => {
  console.log("[ next.config.js (start) ] => preparing");

  setTimeout(async () => {
    await initServices();
    console.log("[ next.config.js (start) ] => initialized");
  }, 1000);

  return nextConfig;
};

export default preparedNext;
