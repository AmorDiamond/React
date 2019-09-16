import React, { Suspense, lazy } from "react";

export const CommonComponent = (Component: any, props: any) => {
  const ThisComponent = lazy(Component);
  return <ThisComponent {...props} />;
};
