import { lazy, Suspense, type ComponentType } from "react";

export default function LazyLoad(factory: () => Promise<{ default: ComponentType }>) {
  const Component = lazy(factory)
  return (props: any = {}) => (
    <Suspense fallback={null}>
      <Component { ...props } />
    </Suspense>
  )
}