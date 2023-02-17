import { removeLocalToken, removeLocalRefreshToken } from "@/axios/storage";
import store from "@/store";

export default function clearToken() {
  removeLocalToken();
  removeLocalRefreshToken();
  store.dispatch("user/setUser", null);
}
