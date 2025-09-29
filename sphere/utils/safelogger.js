// utils/safeLogger.js
export const safeLogger = (label, data) => {
  const sensitiveFields = ["password", "token", "accessToken", "refreshToken"];

  const safeData = Object.fromEntries(
    Object.entries(data).map(([key, value]) =>
      sensitiveFields.includes(key)
        ? [key, "******"] // mask sensitive fields
        : [key, value]
    )
  );

  console.log(label, safeData);
};
