import NoticeCard from "@/components/NoticeCard";

export default function NoticeGrid({ notices, onDeleteRequest }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}
