let showFn = null;
let dismissFn = null;

export default {
    showModal(component) {
        if (!showFn) {
            console.warn("Error presenting modal: must register presenter first!");
            return;
        }

        showFn(component);
    },
    dismissModal() {
        if (!dismissFn) {
            return;
        }

        dismissFn();
    },
    registerPresenter(show, dismiss) {
        showFn = show;
        dismissFn = dismiss;
    },
    unregisterPresenter() {
        showFn = null;
        dismissFn = null;
    }
};