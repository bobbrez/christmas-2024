"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export const BoardImage = ({
  batchId,
  position,
}: {
  batchId: string;
  position: string;
}) => {
  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const [zoomLevel, setZoomLevel] = useState(2);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);

  return (
    <div className="container mx-auto cursor-none">
      <div className="relative h-full w-full">
        <Image
          src={`https://tlm-mkii-image-capture.s3.us-east-1.amazonaws.com/${batchId}-${position}.png`}
          className="h-full w-full"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setImgWidth(width);
            setImgHeight(height);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          onClick={() => {
            setZoomLevel((prev) => (prev > 10 ? 2 : prev * 1.5));
          }}
          alt="img"
          width={2592}
          height={1944}
        />

        {showMagnifier && (
          <div
            className="pointer-events-none absolute cursor-zoom-in border border-gray-200 bg-white"
            style={{
              height: `${magnifierHeight}px`,
              width: `${magnifieWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifieWidth / 2}px`,
              backgroundImage: `url('${`https://tlm-mkii-image-capture.s3.us-east-1.amazonaws.com/${batchId}-${position}.png`}')`,
              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,
              backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
          >
            <div className="w-full pt-1 text-center font-mono text-sm">
              {zoomLevel}x
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BoardPortraitImage = ({
  batchId,
  position,
}: {
  batchId: string;
  position: string;
}) => {
  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const [zoomLevel, setZoomLevel] = useState(2);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);

  const imageUrl = `https://res.cloudinary.com/lumber-manufactory/image/upload/a_90,c_crop,w_648,h_2592/lumber-vision/${batchId}-${position}.png`;

  return (
    <div className={clsx("container mx-auto cursor-none")}>
      <div className="relative h-full w-full">
        <Image
          src={imageUrl}
          className="h-full w-full"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setImgWidth(width);
            setImgHeight(height);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          onClick={() => {
            setZoomLevel((prev) => (prev > 10 ? 2 : prev * 1.5));
          }}
          alt="img"
          width={1944 / 4}
          height={2592 / 4}
        />

        {showMagnifier && (
          <div
            className="pointer-events-none absolute cursor-zoom-in border border-gray-200 bg-white"
            style={{
              height: `${magnifierHeight}px`,
              width: `${magnifieWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifieWidth / 2}px`,
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,
              backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
          >
            <div className="w-full pt-1 text-center font-mono text-sm">
              {zoomLevel}x
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
