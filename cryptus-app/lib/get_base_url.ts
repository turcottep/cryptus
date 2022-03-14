export default function get_base_url() {
  const env = process.env.NODE_ENV;
  console.log("env", env);
  console.log(
    "process.env.NEXT_PUBLIC_VERCEL_ENV",
    process.env.NEXT_PUBLIC_VERCEL_ENV
  );
  console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  let base_url;
  if (env) {
    if (env === "development") {
      base_url = process.env.NEXT_PUBLIC_BASE_URL;
    } else if (env === "production") {
      base_url = process.env.NEXT_PUBLIC_BASE_URL;
    } else if (env === "test") {
      base_url = process.env.NEXT_PUBLIC_VERCEL_ENV;
    }
  } else {
    base_url = process.env.NEXT_PUBLIC_BASE_URL;
  }

  console.log("base_url", base_url);
  return base_url;
}
