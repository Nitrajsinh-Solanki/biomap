
// biomap\src\app\components\ProfileInfo.tsx

"use client";
import { UserProfile } from "./ProfileTypes";

interface ProfileInfoProps {
  user: UserProfile | null;
  setIsEditing: (value: boolean) => void;
}

export default function ProfileInfo({ user, setIsEditing }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-3xl font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.name}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <div className="mt-1 flex items-center">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                user?.verified ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></span>
            <span className="text-sm text-gray-500">
              {user?.verified
                ? "Email verified"
                : "Email not verified"}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Account Information
        </h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Full Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.name}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Email Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.email}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Account Created
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Email Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.verified ? "Verified" : "Not Verified"}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
