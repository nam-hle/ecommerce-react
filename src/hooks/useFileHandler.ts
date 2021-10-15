import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AddImageFile } from "../redux";

function arrayBufferToString(buffer: string | ArrayBuffer | null | undefined): string {
  if (!buffer) {
    return "";
  }

  if (typeof buffer === "string") {
    return buffer;
  }

  return new Uint16Array(buffer).toString();
}

export function useFileHandler<T extends string>(initState: Record<T, AddImageFile[]>) {
  const [imageFile, setImageFile] = useState(initState);
  const [isFileLoading, setFileLoading] = useState(false);

  const removeImage = (params: { id: string; name: T }) => {
    const items = imageFile[params.name].filter((item) => item.id !== params.id);

    setImageFile({
      ...imageFile,
      [params.name]: items,
    });
  };

  const onFileChange = (
    event: { target: { value: string; files: FileList | null } },
    params: { name: T; type: "single" | "multiple" }
  ) => {
    const { files, value } = event.target;

    if (!files || !files[0]) {
      return;
    }

    const img: File = files[0];
    const size = img.size / 1024 / 1024;

    setFileLoading(true);
    if (!/(\.jpg|\.jpeg|\.png)$/i.exec(value)) {
      alert("File type must be JPEG or PNG");
      setFileLoading(false);
      return;
    }

    if (size > 0.5) {
      alert("File size exceeded 500kb, consider optimizing your image");
      setFileLoading(false);
      return;
    }

    if (params.type === "multiple") {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setImageFile((oldFiles) => ({
            ...oldFiles,
            [params.name]: [
              ...oldFiles[params.name],
              { file, url: arrayBufferToString(e.target?.result ?? ""), id: uuidv4() },
            ],
          }));
        });
        reader.readAsDataURL(file);
      });

      setFileLoading(false);
      return;
    }

    // type is single
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      setImageFile((oldImageFiles) => ({
        ...oldImageFiles,
        [params.name]: [
          ...oldImageFiles[params.name],
          { file: img, url: arrayBufferToString(e.target?.result), id: uuidv4() },
        ],
      }));
      setFileLoading(false);
    });
    reader.readAsDataURL(img);
  };

  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange,
    removeImage,
  };
}
