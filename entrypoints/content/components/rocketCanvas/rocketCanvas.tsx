import { useRef, useEffect, useState, useCallback } from 'react';
import rocketImg from '../../../../assets/icon.png';
import cloudImg from '../../../../assets/cloud.png';

const imgLoad = (imgUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = imgUrl;
  });
};

interface RocketCanvasProps {
  startAnimation: boolean;
  visible: boolean;
  speedProcess: number;
}

const RocketCanvas = (props: RocketCanvasProps) => {
  const { visible, speedProcess, startAnimation } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  const rocketShowRef = useRef(false);
  const rocketSpeed = useRef(0.5);
  const rocketXSpeed = useRef(0.1);
  const requestAnimationFrameIdRef = useRef(0);
  const rocketDataRef = useRef({
    url: new Image(),
    xSpeed: 1,
    x: 0,
    y: 0,
  });
  const startAnimationRef = useRef(false);
  const cloudListRef = useRef<any[]>([]);

  const getRandom = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }, []);

  useEffect(() => {
    if (speedProcess === 1) {
      rocketSpeed.current = 5;
      rocketXSpeed.current = 0.3;
    } else {
      rocketSpeed.current = 0.5;
      rocketXSpeed.current = 0.1;
    }
  }, [speedProcess]);

  const animationHandler = () => {
    if (!rocketShowRef.current) {
      cancelAnimationFrame(requestAnimationFrameIdRef.current);
      return;
    }
    canvasCtx.current?.clearRect(0, 0, 50, 50);
    if (startAnimationRef.current) {
      cloudListRef.current.forEach((_, index) => {
        const item = cloudListRef.current[index];
        if (item.y > 50) {
          item.x = getRandom(0, 40);
          item.y = getRandom(0, -150);
        }
        item.y += rocketSpeed.current;
        canvasCtx.current?.drawImage(
          item.url as CanvasImageSource,
          item.x,
          item.y,
          item.with,
          item.height
        );
      });
    }
    if (Math.abs(rocketDataRef.current.x) > 0.5) {
      rocketDataRef.current.xSpeed *= -1;
    }
    rocketDataRef.current.x -=
      rocketDataRef.current.xSpeed * rocketXSpeed.current;
    canvasCtx.current?.drawImage(
      rocketDataRef.current.url,
      rocketDataRef.current.x,
      rocketDataRef.current.y,
      50,
      50
    );
    if (startAnimationRef.current) {
      requestAnimationFrameIdRef.current =
        requestAnimationFrame(animationHandler);
    }
  };

  useEffect(() => {
    rocketShowRef.current = visible;
    startAnimationRef.current = startAnimation;
    if (!canvasRef.current || !visible) {
      return;
    }
    (async () => {
      canvasCtx.current = canvasRef.current!.getContext('2d');
      canvasCtx.current?.clearRect(0, 0, 50, 50);
      const rocketImage = await imgLoad(rocketImg);
      const cloudImage = await imgLoad(cloudImg);

      const randomCloud = () => {
        return {
          with: 15,
          height: 15,
          url: cloudImage,
          x: getRandom(15, 35),
          y: getRandom(0, -100),
        };
      };
      cloudListRef.current = new Array(5).fill(void 0).map(() => randomCloud());
      rocketDataRef.current.url = rocketImage;
      animationHandler();
      requestAnimationFrameIdRef.current =
        requestAnimationFrame(animationHandler);
    })();
  }, [visible, startAnimation]);

  return <canvas ref={canvasRef} width={50} height={50}></canvas>;
};

export default RocketCanvas;
