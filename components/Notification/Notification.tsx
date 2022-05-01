import { NotificationProps } from "./Notification.types";
import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import ReactDOM from "react-dom";

let rootContainer = null as any;

if (typeof document !== "undefined") {
  rootContainer = document.getElementById("root");
}

const styles = {
  container:
    "z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:mt-[80px]",
  modalContainer: "w-full flex flex-col items-center space-y-4 sm:items-end",
  modal:
    "p-4 flex items-start max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
  statusIconContainer: "flex-shrink-0",
  exclamationIcon: "h-6 w-6 text-red-400",
  checkIcon: "h-6 w-6 text-green-400",
  titleContainer: "ml-3 w-0 flex-1 pt-0.5",
  title: "text-sm font-medium text-red-400",
  body: "mt-1 text-sm text-gray-500",
  buttonContainer: "ml-3 flex-shrink-0 flex",
  button:
    "bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500",
  closeIcon: "h-5 w-5",
};

const Notification: React.FC<NotificationProps> = ({
  isError,
  title,
  body,
}) => {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const Notification = () => {
    return (
      <>
        <div aria-live="assertive" className={styles.container}>
          <div className={styles.modalContainer}>
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={styles.modal}>
                <div className={styles.statusIconContainer}>
                  {isError ? (
                    <ExclamationCircleIcon
                      className={styles.exclamationIcon}
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircleIcon
                      className={styles.checkIcon}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className={styles.titleContainer}>
                  <p className={styles.title}>{title}</p>
                  <p className={styles.body}>{body}</p>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className={styles.closeIcon} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  };

  return mounted
    ? ReactDOM.createPortal(<Notification />, rootContainer)
    : null;
};

export default Notification;
