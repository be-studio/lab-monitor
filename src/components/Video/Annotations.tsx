import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const rawData = JSON.stringify(annotations);

  const handleDownload = () => {
    downloadFile(rawData, "annotations.json", "text/json");
  };

  return (
    <>
      <Button onClick={() => onOpen()}>Raw JSON Data</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Raw JSON Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
