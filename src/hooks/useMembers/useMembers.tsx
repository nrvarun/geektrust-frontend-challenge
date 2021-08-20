import { useQuery } from "react-query";

/**
 *
 * Fetches the members JSON data from the endpoint
 */
const getMembers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();

  return data;
};

export default function useMembers() {
  return useQuery("users", getMembers);
}
