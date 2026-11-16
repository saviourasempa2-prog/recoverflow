export const authenticate = {
  admin: async (request) => {
    if (!request) {
      throw new Error("Missing request object");
    }

    return request;
  },
};
