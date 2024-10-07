let revokedTokens = [];

export const addToBlacklist = (token) => {
  revokedTokens.push(token);
};

export const isTokenRevoked = (token) => {
  return revokedTokens.includes(token);
};
