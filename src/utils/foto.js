export function fotoUri(base64) {
  return base64 ? "data:image/jpeg;base64," + base64 : null;
}
