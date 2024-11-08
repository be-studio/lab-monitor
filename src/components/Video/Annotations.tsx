import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";
import { downloadFile } from "../../utility/downloadFile";
import { Annotation } from "../../utility/types";

interface Props {
  annotations: Annotation[][];
}

export const Annotations = ({ annotations }: Props) => {
  const rawData = JSON.stringify(annotations);

  const handleDownload = () => {
    downloadFile(rawData, "annotations.json", "text/json");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Raw JSON Data</Button>
      </PopoverTrigger>
      <PopoverContent width={{ base: "sm", md: "md" }}>
        <PopoverArrow />
        <PopoverCloseButton aria-label="Close raw annotations JSON data" />
        <PopoverHeader>Raw JSON Data</PopoverHeader>
        <PopoverBody>
          <Box>
            <Textarea
              value={rawData}
              fontFamily="mono"
              fontSize="0.7rem"
              readOnly
              aria-label="Raw annotations JSON data"
              data-testid="raw-annotations-json-data"
            />
          </Box>

          <Box>
            <Button onClick={handleDownload} aria-label="Download">
              <MdDownload />
              Download
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
