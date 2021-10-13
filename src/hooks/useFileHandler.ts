/* eslint-disable no-alert */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useFileHandler = (initState: Record<string, { id: string; file: string; url: string }[]>) => {
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
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

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
          setImageFile((oldFiles) => ({
            ...oldFiles,
            [params.name]: [...oldFiles[params.name], { file: file as any, url: e.target.result, id: uuidv4() }],
          }));
        });
        reader.readAsDataURL(file as any);
      });

      setFileLoading(false);
    } else {
      // type is single
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setImageFile({
          ...imageFile,
          [params.name]: { file: img, url: e.target?.result ?? "" },
        });
        setFileLoading(false);
      });
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
