import { createClient } from "@/lib/supabase/server";
import UserDropdownMenu from "./UserDropdownMenu";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <UserDropdownMenu user={user.email} />
    </div>
  ) : (
    <div className="flex gap-2">
      <UserDropdownMenu user={undefined} />
    </div>
  );
}

export default AuthButton;
