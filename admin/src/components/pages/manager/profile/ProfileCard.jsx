// components/profile/ProfileCard.jsx

const ProfileCard = ({ profile }) => {
  const initials = profile?.name
    ?.split(" ")
    ?.map((w) => w[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl font-bold">
        {initials}
      </div>

      <h2 className="mt-4 text-lg font-bold text-slate-900">{profile?.name}</h2>

      <p className="text-sm text-slate-500">{profile?.email}</p>

      <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
        Manager
      </span>
    </div>
  );
};

export default ProfileCard;
