export const extractApiData = <T = any>(response: any): T => {
  const data = response?.data;
  if (!data) {
    console.warn("API response format unexpected:", response);
  }
  return data;
};

export const extractApiContentData = <T = any>(response: any): T => {
  const data = response?.data.data;
  if (!data) {
    console.warn("API response format unexpected:", response);
  }
  return data;
};