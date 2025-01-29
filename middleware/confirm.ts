export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  const localePath = useLocalePath();

  if (!user.value) {
    return navigateTo(localePath("/login"));
  }
  // Check if use from mobile or from pc
  return navigateTo(localePath("/dog"));
});
