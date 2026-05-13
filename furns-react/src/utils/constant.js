import cogoToast from "cogo-toast";

export const PREFIX = "ht";
export const CURRENCY = "$";

export const placeholder = "/images/logo/logo.png";

export const previewModeNotification = (e) => {
    e.preventDefault();
    cogoToast.warn("On Demo Mode this functionality is disabled!", {
        heading: "Demo Mode",
        hideAfter: 6
    })
}
