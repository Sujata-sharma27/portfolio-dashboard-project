import { useRef } from "react";

export function AvatarUpload({
  currentAvatar,
  name,
  onUpload,
  onRemove,
  showRemove,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group w-40 h-40">
      {/* Avatar */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-40 h-40 rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-lg hover:shadow-xl transition-all"
      >
        {currentAvatar ? (
          <img
            src={currentAvatar}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            {name[0]}
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition-all cursor-pointer"
      >
        Change
      </div>

      {/* Remove Button */}
      {showRemove && (
        <button
          onClick={onRemove}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          Remove
        </button>
      )}

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        hidden
      />
    </div>
  );
}