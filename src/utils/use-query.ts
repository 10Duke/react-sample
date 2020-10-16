import { useLocation } from "react-router-dom";

/**
 * Custom useQuery hook for accessing query params
 */
export default function useQuery() {
    return new URLSearchParams(useLocation().search);
}
