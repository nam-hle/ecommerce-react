import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AddImageFile } from "../redux";

export const useFileHandler = (initState: Record<string, AddImageFile[]>) => {
  const [imageFile, setImageFile] = useState(initState);
  const [isFileLoading, setFileLoading] = useState(false);

  const removeImage = (params: { id: string; name: string }) => {
    const items = imageFile[params.name].filter((item) => item.id !== params.id);

    setImageFile({
      ...imageFile,
      [params.name]: items,
    });
  };

  const onFileChange = (event: any, params: { name: string; type: string }) => {
    const val = event.target.value;
    const img: File = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;
    console.log({ img, size, val });

    setFileLoading(true);
    if (!regex.exec(val)) {
      alert("File type must be JPEG or PNG");
      setFileLoading(false);
    } else if (size > 0.5) {
      alert("File size exceeded 500kb, consider optimizing your image");
      setFileLoading(false);
    } else if (params.type === "multiple") {
      Array.from(event.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          const x = { file: file as any, url: JSON.stringify(e.target?.result ?? ""), id: uuidv4() };
          setImageFile((oldFiles) => ({
            ...oldFiles,
            [params.name]: [...oldFiles[params.name], x],
          }));
        });
        reader.readAsDataURL(file as any);
      });

      setFileLoading(false);
    } else {
      // type is single
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        console.log("@@@", e.target?.result);
        setImageFile(() => ({
          ...imageFile,
          [params.name]: [{ file: img, url: JSON.stringify(e.target?.result ?? ""), id: uuidv4() }],
        }));
        setFileLoading(false);
      });
      console.log("here");
      reader.readAsDataURL(img);
    }
  };

  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange,
    removeImage,
  };
};
