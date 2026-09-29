import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns during server rendering; the prerender step uses this.
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
