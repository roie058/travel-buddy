

import { Plan } from "@/components/pageCompnents/Schedule";
import { createContext } from "react";

type UserContextType={
    userId:string|null,
plans:Array<Plan>
} 

export  const UserContext= createContext<UserContextType|null>(null)