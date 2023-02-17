import { setLocalToken, setLocalRefreshToken } from "@/axios/storage";
import store from "@/store";

export default function setToken(response) {
  setLocalToken(response.accessToken);
  setLocalRefreshToken(response.refreshToken);
  store.dispatch("user/setUser", response.data);
}
