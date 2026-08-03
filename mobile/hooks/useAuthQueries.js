import { useQuery, useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

export function useUserProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const data = await authService.getMe();
      setUser(data);
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useLoginMutation() {
  const loginAction = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const result = await loginAction(email, password);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}

export function useRegisterMutation() {
  const registerAction = useAuthStore((state) => state.register);

  return useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const result = await registerAction(fullName, email, password);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}
