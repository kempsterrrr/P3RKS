import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: JSX.Element
}

export default function Portal({ children }: PortalProps) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return ReactDOM.createPortal(
    children,
    document.body
  );
}