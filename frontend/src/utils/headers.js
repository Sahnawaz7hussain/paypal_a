export const headerObject = () => {
  return {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
  };
};
