"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";

type Props = {
  /**
   * トリミング後の画像の横幅
   */
  width: number;
  /**
   * 既存画像のURL
   */
  defaultValue?: string | null;
  aspectRatio?: number;
  onChange: (value: string) => void;
};

export default function ImageCropper({
  aspectRatio = 16 / 9,
  width,
  defaultValue,
  onChange,
}: Props) {
  const editor = useRef<AvatarEditor>(null);
  const [preview, setPreview] = useState<string>(defaultValue || "");
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noKeyboard: true,
    maxSize: 1024 * 1024 * 2,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDropAccepted: (dropped) => {
      setImage(dropped[0]);
      setScale(1.0);
      setOpen(true);
    },
  });
  const [image, setImage] = useState<File>();
  const [scale, setScale] = useState(1.0);
  const [open, setOpen] = useState(false);

  const cropImage = async () => {
    const dataUrl = editor.current?.getImage().toDataURL("image/jpeg");
    const result = await resizeBase64Img(dataUrl!, width, width / aspectRatio);
    setOpen(false);
    setPreview(result);
    onChange(result);
  };

  return (
    <div>
      <div
        className={cn(
          "border overflow-hidden cursor-pointer bg-muted rounded-md grid place-content-center relative",
          isDragAccept ? "border-primary" : "border-border"
        )}
        style={{
          aspectRatio,
        }}
        {...getRootProps()}
      >
        {!preview && (
          <ImagePlus
            strokeWidth={1.5}
            className="w-10 h-10 text-muted-foreground opacity-40"
          />
        )}
        {preview && (
          <Image className="object-cover" fill src={preview} alt="" />
        )}
        <input {...getInputProps()} className="hidden" />

        {preview && (
          <Button
            type="button"
            className="absolute border top-1 h-6 w-6 rounded right-1 bg-muted/90 hover:bg-muted text-muted-foreground"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setPreview("");
              onChange("");
            }}
          >
            <span className="sr-only">画像を削除</span>
            <X size={14} />
          </Button>
        )}
      </div>

      <Dialog open={open} onOpenChange={(status) => setOpen(status)}>
        <DialogContent className="max-w-md">
          <div
            className="border relative overflow-hidden rounded-lg"
            style={{
              aspectRatio,
            }}
          >
            {image && (
              <AvatarEditor
                className="absolute max-w-full max-h-full inset-0"
                scale={scale}
                ref={editor}
                width={1000}
                height={1000 / aspectRatio}
                image={image}
              />
            )}
          </div>

          <div className="my-4">
            <Slider
              max={2}
              step={0.01}
              min={1}
              defaultValue={[1]}
              onValueChange={([value]) => setScale(value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="outline">閉じる</Button>
            </DialogClose>
            <Button onClick={cropImage}>切り抜く</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function resizeBase64Img(base64: string, width: number, height: number) {
  return new Promise<string>((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = function (err) {
      reject(err);
    };

    img.src = base64;
  });
}
