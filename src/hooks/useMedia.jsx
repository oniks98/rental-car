import { useMediaQuery } from "react-responsive";

function useMedia() {
  const isMobile = useMediaQuery({ query: "(max-width: 1199.98px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  return { isMobile, isDesktop };
}

export default useMedia;
