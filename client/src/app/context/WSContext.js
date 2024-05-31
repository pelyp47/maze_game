import { createContext, useContext } from "react";

export const WSContext = createContext()
export const useWSContext = () => {
    return useContext(WSContext);
};