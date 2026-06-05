import { ideasAndNotesService, type IdeaNote } from "@/services/ideasAndNotes";
import { Trash2, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState<IdeaNote[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const inputStyle = {
    backgroundColor: "#0a0a0f",
    borderColor: "#1e1e2e",
    color: "#e2e8f0",
  };

  useEffect(() => {
    ideasAndNotesService
      .getAll()
      .then(setNotes)
      .catch(() => setNotes([]));
  }, []);

  const handleAdd = async () => {
    console.log("Adding note1:", { title, content });
    if (!title.trim()) return;
    try {
      console.log("Adding note 2:", { title, content });
      const created = await ideasAndNotesService.create(title, content);
      console.log("Adding note 3:", { title, content });
      setNotes((n) => [created, ...n]);
      setTitle("");
      setContent("");
      setShowForm(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Virhe tallennuksessa.");
    }
  };

  const handleDelete = async (id: number) => {
    await ideasAndNotesService.delete(id);
    setNotes((n) => n.filter((note) => note.id !== id));
  };

  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    return notes.filter(
      (n) =>
        n.header.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, notes]);

  const handeleUpdate = async (id: number, updatedNote: Partial<IdeaNote>) => {
    try {
      const updated = await ideasAndNotesService.update(id, updatedNote);
      setNotes((n) => n.map((n) => (n.id === id ? updated : n)));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Virhe päivityksessä.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: "#e2e8f0" }}>
          Ideas & Notes
        </h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-gray-800 text-gray-300 placeholder:text-gray-500  border-black focus:outline-none focus:ring-2 focus:ring-gray-700 border rounded-lg px-3 py-2 text-sm transition-colors"
        />
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex justify-center items-center text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#00d4aa", color: "#0a0a0f" }}
        >
          <Plus size={12} />
          <span className="ml-2 font-semibold">New note</span>
        </button>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      {showForm && (
        <div
          className="rounded-xl border p-4 space-y-3"
          style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
        >
          <input
            placeholder="Header..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none font-mono"
            style={inputStyle}
          />
          <textarea
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none font-mono resize-none"
            style={inputStyle}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80"
              style={{ backgroundColor: "#00d4aa", color: "#0a0a0f" }}
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80"
              style={{ backgroundColor: "#1e1e2e", color: "#e2e8f0" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {filteredNotes.length === 0 && !showForm && (
        <p className="text-center py-20 text-sm" style={{ color: "#64748b" }}>
          No ideas or notes yet. Click "New Note" to add your thoughts and
          trading ideas!
        </p>
      )}

      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-xl border p-4 space-y-2"
            style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
          >
            <div className="flex items-start justify-between">
              <textarea
                onBlur={() => handeleUpdate(note.id, { header: note.header })}
                className="font-semibold w-full h-fit outline-none resize-none"
                style={{ color: "#e2e8f0" }}
                value={note.header}
                onChange={(e) => {
                  const updatedHeader = e.target.value;
                  setNotes((n) =>
                    n.map((n) =>
                      n.id === note.id ? { ...n, header: updatedHeader } : n,
                    ),
                  );
                }}
              >
                {note.header}
              </textarea>
              <div className="flex items-center gap-3">
                <p className="text-xs" style={{ color: "#64748b" }}>
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString("fi-FI")
                    : ""}
                </p>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-xs hover:opacity-80"
                  style={{ color: "#ef4444" }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {note.content && (
              // <textarea
              //   onBlur={() => handeleUpdate(note.id, { content: note.content })}
              //   value={note.content}
              //   rows={3}
              //   className="text-sm whitespace-pre-wrap overflow-hidden w-full outline-none resize-none"
              //   style={{ color: "#94a3b8" }}
              //   onChange={(e) => {
              //     const updatedContent = e.target.value;
              //     setNotes((n) =>
              //       n.map((n) =>
              //         n.id === note.id ? { ...n, content: updatedContent } : n,
              //       ),
              //     );
              //   }}
              // >
              //   {note.content}
              // </textarea>
              <textarea
                onBlur={() => handeleUpdate(note.id, { content: note.content })}
                value={note.content}
                rows={1}
                ref={(el) => {
                  if (el) {
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }
                }}
                onChange={(e) => {
                  const updatedContent = e.target.value;

                  setNotes((n) =>
                    n.map((n) =>
                      n.id === note.id ? { ...n, content: updatedContent } : n,
                    ),
                  );
                }}
                className="text-sm whitespace-pre-wrap w-full outline-none resize-none overflow-hidden"
                style={{ color: "#94a3b8" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
