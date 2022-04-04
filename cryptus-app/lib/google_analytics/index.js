// log the pageview with their URL
export const pageview = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  console.log("traacking a man:", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
  window.gtag("event", action, params);
};
