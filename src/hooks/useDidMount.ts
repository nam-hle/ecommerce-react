import { useEffect, useState } from "react";

export const useDidMount = (initState = false) => {
  const [didMount, setDidMount] = useState(initState);

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
    };
  }, []);

  return didMount;
};
