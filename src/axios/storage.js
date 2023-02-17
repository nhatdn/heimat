// Get TOKEN
export function getLocalToken() {
  return window.localStorage.getItem('token');
}
export function getLocalRefreshToken() {
  return window.localStorage.getItem('refreshToken');
}

// Set TOKEN
export function setLocalToken(newToken) {
  window.localStorage.setItem('token', newToken);
}
export function setLocalRefreshToken(newRefeshToken) {
  window.localStorage.setItem('refreshToken', newRefeshToken);
}

// Remove TOKEN
export function removeLocalToken() {
  return window.localStorage.removeItem('token');
}
export function removeLocalRefreshToken() {
  return window.localStorage.removeItem('refreshToken');
}
