import { useState, useEffect } from "react";
import { Annotation } from "../utility/types";

export const ANNOTATIONS_API_URL =
  "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.json";

export const useGetAnnotations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [annotations, setAnnotations] = useState<Annotation[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(ANNOTATIONS_API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setAnnotations(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    annotations,
  };
};
