import { LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <LoadingOutlined
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            margin: "auto",
          }}
        />
      )}
      <img
        alt={alt || ""}
        className={`${className || ""} ${loaded ? "is-img-loaded" : "is-img-loading"}`}
        onLoad={onLoad}
        // @ts-ignore
        src={src}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: "image-loader",
};

type ImageLoaderProps = {
  src: File | string;
  alt: string;
  className?: string;
};
