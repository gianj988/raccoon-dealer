import { Alert } from "react-bootstrap";

function ToastInfo({
  show,
  message,
  onClose,
}: {
  show: boolean;
  message: string;
  onClose?: (e?: any) => void;
}) {
  return (
    <>
      <Alert
        className="w-xs-100 w-50 m-auto"
        style={{ zIndex: 5000 }}
        dismissible
        variant="info"
        onClose={onClose}
        show={show}
      >
        {message}
      </Alert>
    </>
  );
}

export default ToastInfo;
