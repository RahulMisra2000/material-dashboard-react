import { useEffect } from "react";
import { addLogWithLimit } from "../services/logsService";

const useAppLogger = () => {
  useEffect(() => {
    const logStart = async () => {
      await addLogWithLimit("App started");
    };

    const logEnd = async () => {
      await addLogWithLimit("App ended");
    };

    logStart();

    return () => {
      logEnd();
    };
  }, []);
};

export default useAppLogger;
