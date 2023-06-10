
import Features from '../homepage/Features'
import GuideLink from '../homepage/GuideLink'
import NewHero from '../homepage/NewHero'
import { TFunction } from 'i18next'


interface Props {
  t:TFunction<"home", undefined, "home">
}

export default function HomePage({t}:Props) {


  

  return (
    <>
      <main  style={{minHeight:'100vh'}} >
        <NewHero t={t}/>
        <Features t={t}/>
        <GuideLink t={t}/>
         </main>
    </>
  )
}



