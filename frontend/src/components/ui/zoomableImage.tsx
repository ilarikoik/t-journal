import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function ZoomableImage({ src }: { src: string }) {
  return (
    <TransformWrapper wheel={{ step: 0.001 }} initialScale={1}>
      <TransformComponent>
        <img src={src} alt="Trade screenshot" />
      </TransformComponent>
    </TransformWrapper>
  );
}
