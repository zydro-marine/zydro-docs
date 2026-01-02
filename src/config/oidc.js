// OIDC Configuration
// These values should be set via environment variables or a config file
export const oidcConfig = {
    authority:
        import.meta.env.VITE_OIDC_AUTHORITY || "https://your-oidc-provider.com",
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID || "",
    redirect_uri:
        import.meta.env.VITE_OIDC_REDIRECT_URI ||
        window.location.origin + "/callback",
    response_type: "code",
    scope: import.meta.env.VITE_OIDC_SCOPE || "openid profile email",
    post_logout_redirect_uri:
        import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI ||
        window.location.origin,
    automaticSilentRenew: true,
    loadUserInfo: true,
};
