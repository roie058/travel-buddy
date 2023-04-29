import { Plan } from "@/pages/plans/[planId]/schedule";
import { createContext } from "react";

type PlanContextType={
plan:Plan
} 

export  const PlanContext= createContext<PlanContextType|null>(null)