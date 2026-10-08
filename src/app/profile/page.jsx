import {getCurrentUser} from "@/lib/auth/getCurrentUser"
import MobileProfileContent from "./_components/profile_content/MobileProfileContent"
import BottomNev from "@/components/layout/BottomNev"

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      {/* Mobile Content */}
      <MobileProfileContent currentUser={currentUser} />
      {/* Bottom Navigation (Mobile Only) */}
      <div className="lg:hidden">
        <BottomNev />
      </div>
    </div>
  )
}

export default ProfilePage