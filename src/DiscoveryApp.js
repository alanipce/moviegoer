import JSXComponent from 'metal-jsx';

import FeaturedMovieCollection from './FeaturedMovieCollection';
import ModalCoordinator from './utility/modal';

class DiscoveryApp extends JSXComponent {
    created() {
        this.showModal = this.showModal.bind(this);
        this.dismissModal = this.dismissModal.bind(this);
        this.handleInitiatedPurchase = this.handleInitiatedPurchase.bind(this);
    }
    attached() {
        ModalCoordinator.registerPresenter(this.showModal, this.dismissModal);
    }

    willDetach() {
        ModalCoordinator.unregisterPresenter();
    }

    render() {
        const {currentModalComponent} = this.state;
        const isModalOpen = this.state.currentModalComponent != null;

        return (
            <div class={`${isModalOpen? 'app--modal-open' : ''}`}>
                <header>
                    <h1>moviegoer</h1>
                </header>
                <main class="container">
                    <FeaturedMovieCollection events={{purchaseInitiated: this.handleInitiatedPurchase}} />
                </main>
                <div class={`modal${isModalOpen? ' modal--visible' : ''}`}>
                    <button class="modal__dismiss-button" data-onclick={this.dismissModal}></button>
                    <div class="modal__content">
                        {currentModalComponent}
                    </div>
                    <div class="modal__backdrop" data-onclick={this.dismissModal}></div>
                </div>
            </div>
        );
    }

    showModal(component) {
        console.log("presenting modal to user...");
        this.state.currentModalComponent = component;
    }

    dismissModal() {
        console.log("dismissing modal component...");
        this.state.currentModalComponent = null;
    }

    handleInitiatedPurchase(payload) {
        console.log('purchase intiated', payload.movie);
    }
}

DiscoveryApp.STATE = {
    currentModalComponent: {
        value: null
    }
};

export {DiscoveryApp};
export default DiscoveryApp;