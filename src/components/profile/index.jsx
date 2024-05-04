import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "./profile.services";

export default function Profile() {
  const {
    isLoading,
    isError,
    error,
    data = [],
  } = useQuery({
    queryKey: ["profile", "list"],
    queryFn: () => fetchProfile('2'),
  });
  return <h1>profile</h1>;
}
