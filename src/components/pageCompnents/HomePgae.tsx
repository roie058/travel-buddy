import dynamic from 'next/dynamic'
import NewHero from '../homepage/NewHero'
const DynamicGuideLink = dynamic(() => import("../homepage/GuideLink"), {loading: () => <p>Loading...</p>,})
const DynamicFeatures = dynamic(() => import("../homepage/Features"), {loading: () => <p>Loading...</p>,})
import { TFunction } from 'i18next'


interface Props {
  t:TFunction<"home", undefined, "home">
}

export default function HomePage({t}:Props) {


  

  return (
    <>
      <main  style={{minHeight:'100vh'}} >
        <NewHero t={t}/>
        <DynamicFeatures t={t}/>
        <DynamicGuideLink t={t}/>
         </main>
    </>
  )
}



