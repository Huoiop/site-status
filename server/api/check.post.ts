import { verifyJwt } from "../utils/jwt";

type CheckResult = {
  code: 200 | 500 | 401;
  message: string;
  passwordRequired: boolean;
};

export default defineEventHandler(async (event): Promise<CheckResult> => {
  const config = useRuntimeConfig();
  const { sitePassword, siteSecretKey } = config;
  const passwordRequired = Boolean(sitePassword && siteSecretKey);

  try {
    if (!passwordRequired) {
      return {
        code: 200,
        message: "No password is currently set, no need to log in",
        passwordRequired,
      };
    }
    // 验证 token
    const token = getCookie(event, "authToken");
    if (!token) {
      setResponseStatus(event, 401);
      return {
        code: 401,
        message: "User not authenticated",
        passwordRequired,
      };
    }
    // 验证 token 是否有效
    const isLogin = await verifyJwt(token);
    if (!isLogin) {
      setResponseStatus(event, 401);
      return {
        code: 401,
        message: "Invalid or expired token",
        passwordRequired,
      };
    }
    // 验证通过
    return {
      code: 200,
      message: "User is authenticated",
      passwordRequired,
    };
  } catch (error) {
    console.error("Error during authentication check:", error);
    setResponseStatus(event, 500);
    return {
      code: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      passwordRequired,
    };
  }
});
