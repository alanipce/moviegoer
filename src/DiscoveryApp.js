import JSXComponent from 'metal-jsx';

import FeaturedMovieCollection from './FeaturedMovieCollection';
import ModalCoordinator from './utility/modal';
import MovieBoxOffice from './MovieBoxOffice';

class DiscoveryApp extends JSXComponent {
    created() {
        this.showModal = this.showModal.bind(this);
        this.dismissModal = this.dismissModal.bind(this);
        this.handleInitiatedPurchase = this.handleInitiatedPurchase.bind(this);
        this.handleCancelledPurchase = this.handleCancelledPurchase.bind(this);
    }
    attached() {
        ModalCoordinator.registerPresenter(this.showModal, this.dismissModal);
    }

    willDetach() {
        ModalCoordinator.unregisterPresenter();
    }

    render() {
        const {currentModalComponent, movieUnderPurchase} = this.state;
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
                </div>
                {movieUnderPurchase != null &&
                    <MovieBoxOffice movie={movieUnderPurchase} events={{purchaseCancelled: this.handleCancelledPurchase}} />
                }
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

    startPurchaseFlow(movie) {
        console.log('purchase intiated', movie);
        this.state.movieUnderPurchase = movie;

    }

    cancelPurchase() {
        this.state.movieUnderPurchase = null;
    }

    handleInitiatedPurchase(payload) {
        this.startPurchaseFlow(payload.movie);
    }

    handleCancelledPurchase() {
        this.cancelPurchase();
    }
}

DiscoveryApp.STATE = {
    currentModalComponent: {
        value: null
    },
    movieUnderPurchase: {
        value: null
    }
};

export {DiscoveryApp};
export default DiscoveryApp;