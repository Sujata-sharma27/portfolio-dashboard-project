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
    <div>
      <div onClick={() => fileInputRef.current?.click()}>
        {currentAvatar ? (
          <img src={currentAvatar} className="w-40 h-40 rounded-full" />
        ) : (
          <div className="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
            {name[0]}
          </div>
        )}
      </div>

      {showRemove && (
        <button onClick={onRemove}>Remove</button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        hidden
      />
    </div>
  );
}