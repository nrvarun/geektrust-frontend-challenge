/**
 *
 * Fetches the members JSON data from the endpoint
 */
export const useMembers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();

  return data;
};
