import { useQuery } from "react-query";

const getUserData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();

  return data;
};

export default function useUserData() {
  return useQuery("posts", getUserData);
}
