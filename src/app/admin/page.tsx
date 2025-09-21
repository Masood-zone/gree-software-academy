export default function AdminDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-white aspect-video rounded-xl" />
        <div className="bg-white aspect-video rounded-xl" />
        <div className="bg-white aspect-video rounded-xl" />
      </div>
    </div>
  );
}
