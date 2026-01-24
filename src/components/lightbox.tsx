/** biome-ignore-all lint/a11y/useKeyWithClickEvents: shut up! */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: shut up */
import { useCallback, useEffect, useState } from "react";
import { cn } from "$/lib/utils";

export type PhotoMeta = {
  camera?: string;
  lensModel?: string;
  focalLength35mmEquivalent?: string;
  iso?: string;
  exposure?: string;
  FStop?: string;
  taken?: string;
};

export type ImageZoomProps = {
  children: React.ReactNode;
  src?: string;
  className?: string;
  meta?: PhotoMeta;
};

export const ImageZoom = ({ children, src, className, meta }: ImageZoomProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className={cn("cursor-zoom-in", className)} onClick={openLightbox}>
        {children}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm cursor-zoom-out transition-[opacity,visibility] duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <div className="h-full overflow-y-auto flex flex-col items-center justify-start pt-8 pb-12 px-4 md:px-8">
          <div
            className={cn(
              "shrink-0 cursor-default transition-[opacity,transform] duration-300 delay-100",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt="Lightbox view"
              className="max-h-[70vh] max-w-full object-contain shadow-2xl border border-border"
            />
          </div>

          {meta && (
            <div
              className={cn(
                "w-full max-w-2xl mt-6 cursor-default transition-[opacity,transform] duration-300 delay-100",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[15px] leading-[26px] tracking-normal text-primary">
                {meta.camera && <span>{meta.camera}</span>}
                {meta.focalLength35mmEquivalent && <span>{meta.focalLength35mmEquivalent}mm</span>}
                {meta.FStop && <span>ƒ/{meta.FStop}</span>}
                {meta.exposure && <span>{meta.exposure}</span>}
                {meta.iso && <span>ISO {meta.iso}</span>}
                {formatDate(meta.taken) && <span>{formatDate(meta.taken)}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
