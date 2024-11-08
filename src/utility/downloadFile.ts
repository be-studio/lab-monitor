export const downloadFile = (
  data: string,
  filename: string,
  fileType: string,
) => {
  const blob = new Blob([data], { type: fileType });
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  anchor.dispatchEvent(clickEvent);
  window.URL.revokeObjectURL(anchor.href);
  anchor.remove();
};
