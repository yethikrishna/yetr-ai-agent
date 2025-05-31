import { useAuthStore } from '../store/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
    clearError,
    setLoading,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
    clearError,
    setLoading,
  };
};
