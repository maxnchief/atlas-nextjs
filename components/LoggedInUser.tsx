import { auth } from "@/auth";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default async function LoggedInUser() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const user = session.user;
  const avatarUrl = user.image;
  const userName = user.name || "User";

  return (
    <div className="flex items-center gap-3 px-3 py-4 rounded-md bg-gray-100">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={userName}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <UserCircleIcon className="w-10 h-10 text-gray-600" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
        <p className="text-xs text-gray-500 truncate">{user.email || ""}</p>
      </div>
    </div>
  );
}
