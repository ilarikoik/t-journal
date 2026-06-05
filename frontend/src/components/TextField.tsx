export default function TextField({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{
        backgroundColor: "#111118",
        borderColor: "#1e293b",
      }}
    >
      <h3
        className="font-semibold text-white mb-2"
        style={{ color: "#00d4aa" }}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
