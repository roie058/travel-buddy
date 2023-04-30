
import { Plan } from "@/components/pageCompnents/Schedule";
import { createContext } from "react";

type PlanContextType={
plan:Plan
} 

export  const PlanContext= createContext<PlanContextType|null>(null)