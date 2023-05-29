
import { Plan } from "@/components/pageCompnents/Schedule";
import { createContext } from "react";

type PlanContextType={
plan:Plan,
setPlan:React.Dispatch<React.SetStateAction<Plan>>
} 

export  const PlanContext= createContext<PlanContextType|null>(null)