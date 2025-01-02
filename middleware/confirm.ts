export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }
  // Check if use from mobile or from pc
  return navigateTo("/dog");
});
