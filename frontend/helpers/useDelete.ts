import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "../config";

const router = useRouter();

const useDeleteEvent = async (id: number, token: string) => {
  if (confirm("Are you sure?")) {
    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      router.reload();
    }
  }
};

export default useDeleteEvent;
