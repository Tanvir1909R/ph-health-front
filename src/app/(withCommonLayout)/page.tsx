import HomeSection from "@/components/ui/homepage/HomeSection"
import Specialties from "@/components/ui/homepage/Specialties"
import TopRatedDoctor from "@/components/ui/homepage/TopRatedDoctor"
import WhyUs from "@/components/ui/homepage/WhyUs"

const HomePage = () => {
  return (
    <div>
      <HomeSection />
      <Specialties/>
      <TopRatedDoctor/>
      <WhyUs/>
    </div>
  )
}

export default HomePage