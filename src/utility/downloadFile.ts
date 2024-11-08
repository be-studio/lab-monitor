export const downloadFile = (
  data: string,
  filename: string,
  fileType: string,
) => {
  // Create blob from JSON to be made available to download as a file.
  const blob = new Blob([data], { type: fileType });
  // Create hyperlink in DOM (invisible to users) linking to JSON file.
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });
  // Programmatically click hyperlink to download JSON file.
  anchor.dispatchEvent(clickEvent);
  // Revoke created object URL to avoid memory leak.
  window.URL.revokeObjectURL(anchor.href);
  anchor.remove();
};
