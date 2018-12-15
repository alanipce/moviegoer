import JSXComponent from 'metal-jsx';

import FeaturedMovieCollection from './FeaturedMovieCollection';
import ModalCoordinator from './utility/modal';

class DiscoveryApp extends JSXComponent {
    created() {
        this.showModal = this.showModal.bind(this);
        this.dismissModal = this.dismissModal.bind(this);
    }
    attached() {
        ModalCoordinator.registerPresenter(this.showModal, this.dismissModal);
    }

    willDetach() {
        ModalCoordinator.unregisterPresenter();
    }

    render() {
        const {currentModalComponent} = this.state;

        return (
            <div>
                <header>
                    <h1>moviegoer</h1>
                </header>
                <main class="container">
                    <FeaturedMovieCollection />
                </main>
                <div class={`modal${currentModalComponent != null? ' modal--visible' : ''}`}>
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
}

DiscoveryApp.STATE = {
    currentModalComponent: {
        value: null
    }
};

export {DiscoveryApp};
export default DiscoveryApp;