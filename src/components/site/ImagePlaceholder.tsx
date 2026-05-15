import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  className = "",
  ratio = "aspect-square",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`${ratio} ${className} relative rounded-2xl glass-strong border-2 border-dashed border-gold/30 flex flex-col items-center justify-center text-center p-4 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-indigo-500/5" />
      <ImageIcon className="w-10 h-10 text-gold/60 mb-2 relative z-10" />
      <p className="text-xs md:text-sm text-muted-foreground relative z-10">
        Upload: <span className="text-gold font-medium">{label}</span>
      </p>
    </div>
  );
}
