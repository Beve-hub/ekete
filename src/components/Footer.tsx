// src/components/Footer.tsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { Dot, X, Send, ImagePlus, Plus, Trash2 } from "lucide-react";
import { socialLinks } from "../utils/data";
import type { SocialLink, WriteUpForm, Subsection, FileWithPreview } from "../lib/types";

export const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [titleImages, setTitleImages] = useState<FileWithPreview[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [subsectionImages, setSubsectionImages] = useState<
    Record<number, FileWithPreview[]>
  >({});
  const nextId = useRef<number>(1);

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const titleFileInputRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = "writeup-title";

  // NEW: scrollable panel and auto-scroll flag
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);

  // Focus first field, lock background scroll, close on Escape
  useEffect(() => {
    if (open) {
      firstFieldRef.current?.focus();
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const [form, setForm] = useState<WriteUpForm>({
    title: "",
    category: "",
    content: "",
    tags: "",
    email: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSubTitle = (): void => {
    const id = nextId.current++;
    setSubsections((prev) => [...prev, { id, subtitle: "", body: "" }]);
    setSubsectionImages((prev) => ({ ...prev, [id]: [] }));
    // why: ensure the newest block is visible without manual scrolling
    shouldScrollRef.current = true;
  };

  const removeSubTitle = (id: number): void => {
    setSubsections((prev) => prev.filter((s) => s.id !== id));
    setSubsectionImages((prev) => {
      const copy = { ...prev };
      // why: release object URLs tied to this block when removed
      (copy[id] || []).forEach((img) => URL.revokeObjectURL(img.preview));
      delete copy[id];
      return copy;
    });
  };

  const updateSubtitle = (
    id: number,
    field: "subtitle" | "body",
    value: string
  ): void => {
    setSubsections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // --- images: title
  const onPickTitleImages = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const picked: FileWithPreview[] = Array.from(files).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setTitleImages((prev) => [...prev, ...picked]);
  };

  const clearAllTitleImages = () => {
    titleImages.forEach((i) => URL.revokeObjectURL(i.preview));
    setTitleImages([]);
  };

  const removeTitleImage = (idx: number) => {
    setTitleImages((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed.preview);
      return copy;
    });
  };

  // --- images: subsection
  const onPickSubImages = (id: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const picked: FileWithPreview[] = Array.from(files).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setSubsectionImages((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), ...picked],
    }));
  };

  const clearSubsectionImages = (sid: number) => {
    (subsectionImages[sid] || []).forEach((i) => URL.revokeObjectURL(i.preview));
    setSubsectionImages((prev) => ({ ...prev, [sid]: [] }));
  };

  const removeSubImage = (sid: number, idx: number) => {
    setSubsectionImages((prev) => {
      const current = prev[sid] || [];
      const copy = [...current];
      const [removed] = copy.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed.preview);
      return { ...prev, [sid]: copy };
    });
  };

  const cleanedSubsections = useMemo(
    () =>
      subsections
        .map((s) => ({ ...s, subtitle: s.subtitle.trim(), body: s.body.trim() }))
        .filter((s) => s.subtitle || s.body),
    [subsections]
  );

  // release any remaining object URLs when component unmounts
  useEffect(() => {
    return () => {
      titleImages.forEach((i) => URL.revokeObjectURL(i.preview));
      Object.values(subsectionImages).forEach((arr) =>
        arr.forEach((i) => URL.revokeObjectURL(i.preview))
      );
    };
  }, [titleImages, subsectionImages]);

  // NEW: after adding a subtitle, scroll the modal panel to the bottom smoothly
  useEffect(() => {
    if (!open) return;
    if (!shouldScrollRef.current) return;
    // double rAF to wait for DOM + layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = panelRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        shouldScrollRef.current = false;
      });
    });
  }, [subsections, open]);

  const resetAll = () => {
    setForm({ title: "", category: "", content: "", tags: "", email: "" });
    setSubsections([]);
    // revoke and clear images
    clearAllTitleImages();
    Object.keys(subsectionImages).forEach((k) => clearSubsectionImages(Number(k)));
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleTrim = form.title.trim();
    const contentTrim = form.content.trim();

    if (!titleTrim || !contentTrim) {
      alert("Title and Content are required.");
      return;
    }

    // JSON payload (when backend expects JSON)
    const jsonPayload = {
      title: titleTrim,
      category: form.category?.trim() || undefined,
      content: contentTrim,
      tags: form.tags?.trim() || undefined,
      email: form.email?.trim() || undefined,
      subsections: cleanedSubsections.map((s) => ({
        id: s.id,
        subtitle: s.subtitle,
        body: s.body,
        images: (subsectionImages[s.id] || []).map((fw) => fw.file.name), // why: avoid sending blobs in JSON
      })),
      titleImages: titleImages.map((fw) => fw.file.name),
    };

    // FormData (when backend expects multipart)
    const formData = new FormData();
    formData.append("title", titleTrim);
    formData.append("content", contentTrim);
    if (form.category) formData.append("category", form.category);
    if (form.tags) formData.append("tags", form.tags);
    if (form.email) formData.append("email", form.email);

    titleImages.forEach((fw, i) => formData.append(`titleImages[${i}]`, fw.file));
    cleanedSubsections.forEach((s, i) => {
      formData.append(`subsections[${i}][id]`, String(s.id));
      formData.append(`subsections[${i}][subtitle]`, s.subtitle);
      formData.append(`subsections[${i}][body]`, s.body);
      (subsectionImages[s.id] || []).forEach((fw, j) =>
        formData.append(`subsections[${i}][images][${j}]`, fw.file)
      );
    });

    try {
      setSubmitting(true);

      // NOTE: Replace with your real API call
      // Example JSON submit:
      // await fetch("/api/writeups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(jsonPayload) });

      // Example multipart submit:
      // await fetch("/api/writeups", { method: "POST", body: formData });

      await new Promise((res) => setTimeout(res, 600));

      console.log("Submitting article JSON payload:", jsonPayload);
      console.log("FormData keys:");
      for (const [k, v] of formData.entries()) console.log(k, v);

      resetAll();
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6">
      <p className="text-xs text-gray-500">
        Copyright © {new Date().getFullYear()} Ekete Emmanuel
        <Dot className="inline mx-1" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border px-3 py-1 text-xs font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Write Up
        </button>
      </p>

      <div className="flex items-center gap-1">
        {(socialLinks as SocialLink[]).map(({ platform: Icon, href, label }, index) => (
          <a
            key={href ?? index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label ?? `Open social link ${index + 1}`}
            title={label}
            className="inline-flex items-center justify-center size-9 rounded-full border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Icon aria-hidden className="size-4" />
          </a>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {/* NEW: make panel scrollable with max height */}
            <div
              ref={panelRef}
              className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 id={titleId} className="text-lg font-semibold text-[var(--bg)]">
                  Submit a Write‑Up
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-[var(--text)] bg-[var(--bg)]"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={onSubmit} className="px-5 py-4 space-y-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addSubTitle}
                    className="bg-[var(--primary)] text-white rounded-md inline-flex items-center px-3 "
                  >
                    <Plus className="h-4 w-4" />
                    <span>Sub Title</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[var(--bg)]">
                      Title *
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={form.title}
                      onChange={onChange}
                      className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-[var(--bg)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-[var(--bg)]">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={6}
                    value={form.content}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-[var(--bg)]"
                    placeholder="Write your article or note…"
                  />
                </div>

                {/* Title images */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--bg)]">Title Images</p>
                    <div className="flex items-center gap-2">
                      {titleImages.length > 0 && (
                        <button
                          type="button"
                          onClick={clearAllTitleImages}
                          className="inline-flex items-center gap-2 rounded-md border px-2 py-1 hover:bg-[var(--primary)]  bg-[var(--bg)]"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm ">Clear</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => titleFileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 hover:bg-[var(--primary)] bg-[var(--bg)]"
                      >
                        <ImagePlus className="h-4 w-4" />
                        <span className="text-sm text-[var(--text)]">Add images</span>
                      </button>
                    </div>
                  </div>

                  <input
                    ref={titleFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => onPickTitleImages(e.target.files)}
                  />

                  {titleImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {titleImages.map((img, idx) => (
                        <div key={img.preview} className="relative group border rounded-lg overflow-hidden">
                          <img src={img.preview} alt={`Title image ${idx + 1}`} className="h-28 w-full object-cover" />
                          <button
                            type="button"
                            aria-label="Remove image"
                            onClick={() => removeTitleImage(idx)}
                            className="absolute top-1 right-1 inline-flex items-center justify-center rounded-md bg-white/90 border p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subsections */}
                {subsections.length > 0 && (
                  <div className="space-y-4">
                    {subsections.map((s, idx) => (
                      <div key={s.id} className="border rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-md font-bold text-[var(--bg)]">Subtitle {idx + 1}</p>
                          <button
                            type="button"
                            onClick={() => removeSubTitle(s.id)}
                            aria-label={`Remove Subtitle ${idx + 1}`}
                            className="inline-flex items-center justify-center rounded-md border px-2 py-1 hover:bg-[var(--primary)] text-[var(--bg)] shadow-lg"
                          >
                            <X className="h-4 w-4 text-[var(--accent)]" />
                          </button>
                        </div>

                        <div className="mt-3 grid gap-1">
                          <label htmlFor={`subtitle-${s.id}`} className="text-sm text-gray-700">
                            Sub Title
                          </label>
                          <input
                            id={`subtitle-${s.id}`}
                            type="text"
                            value={s.subtitle}
                            onChange={(e) => updateSubtitle(s.id, "subtitle", e.target.value)}
                            className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--bg)]"
                            placeholder="Enter subtitle"
                          />
                        </div>

                        <div className="mt-3 grid gap-1">
                          <label htmlFor={`subcontent-${s.id}`} className="text-sm text-gray-700">
                            Sub Title Content
                          </label>
                          <textarea
                            id={`subcontent-${s.id}`}
                            value={s.body}
                            onChange={(e) => updateSubtitle(s.id, "body", e.target.value)}
                            className="border rounded-md px-3 py-2 min-h-[120px] outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--bg)]"
                            placeholder="Write subtitle content..."
                          />
                        </div>

                        {/* Subsection images */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">Images</p>
                            <div className="flex items-center gap-2">
                              {(subsectionImages[s.id]?.length || 0) > 0 && (
                                <button
                                  type="button"
                                  onClick={() => clearSubsectionImages(s.id)}
                                  className="inline-flex items-center gap-2 rounded-md border px-2 py-1 hover:bg-[var(--bg)] bg-[var(--bg)]"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="text-sm">Clear</span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => fileInputRefs.current[s.id]?.click()}
                                className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 hover:bg-[var(--primary)] bg-[var(--bg)]"
                              >
                                <ImagePlus className="h-4 w-4" />
                                <span className="text-sm">Add images</span>
                              </button>
                            </div>
                          </div>

                          <input
                            ref={(el) => {
                              fileInputRefs.current[s.id] = el;
                            }}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => onPickSubImages(s.id, e.target.files)}
                          />

                          {(subsectionImages[s.id] || []).length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {(subsectionImages[s.id] || []).map((img, i) => (
                                <div key={img.preview} className="relative group border rounded-lg overflow-hidden">
                                  <img
                                    src={img.preview}
                                    alt={`Subtitle {${idx + 1}} image ${i + 1}`}
                                    className="h-28 w-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    aria-label="Remove image"
                                    onClick={() => removeSubImage(s.id, i)}
                                    className="absolute top-1 right-1 inline-flex items-center justify-center rounded-md bg-white/90 border p-1 opacity-0 group-hover:opacity-100 transition"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-60"
                  >
                    <Send className="size-4" />
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </form>
              <div className="px-5 pb-4 text-[11px] text-gray-500">Fields marked * are required.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
