import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const checkIpfs = () => {
      if (window.ipfs) {
        console.log("IPFS Companion is running");
      } else {
        console.log("IPFS Companion is not running or not installed.");
      }
    };

    // Wait a bit for IPFS Companion to initialize
    const intervalId = setInterval(checkIpfs, 1000); // Check every second

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only on mount

  return <div>Test</div>;
}
