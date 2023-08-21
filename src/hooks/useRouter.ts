import { useNavigate } from 'react-router-dom';

export const useRouter = (level: number) => {
  const router = useNavigate();
  const currentPath = window.location.pathname;
  const currentLevelPath = currentPath.split('/')[level + 1];

  return {
    currentPath,
    currentLevelPath,
    routeTo: (path: string) => router(path),
  };
};
