
import Features from '../homepage/Features'
import GuideLink from '../homepage/GuideLink'
import NewHero from '../homepage/NewHero'





export default function HomePage() {


  return (
    <>
      <main style={{minHeight:'100vh'}} >
        <NewHero/>
        <Features/>
        <GuideLink/>
         </main>
    </>
  )
}