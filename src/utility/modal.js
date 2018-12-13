let showFn = null;
let dismissFn = null;

export default {
    show(component) {
        if (!showFn) {
            console.warn("Error presenting modal: must register presenter first!");
            return;
        }

        showFn(component);
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