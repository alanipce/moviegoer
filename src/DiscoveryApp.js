import JSXComponent from 'metal-jsx';

import FeaturedMovieOverview from './FeaturedMovieOverview';
import ModalCoordiantor from './utility/modal';

class DiscoveryApp extends JSXComponent {
    created() {
        this.showModal = this.showModal.bind(this);
        this.dismissModal = this.dismissModal.bind(this);
    }
    attached() {
        ModalCoordiantor.registerPresenter(this.showModal, this.dismissModal);
    }

    willDetach() {
        ModalCoordiantor.unregisterPresenter();
    }

    render() {
        const {currentModalComponent} = this.state;

        return (
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                </header>
                <main>
                    <FeaturedMovieOverview />
                </main>
                {currentModalComponent &&
                    <div class="modal">
                        {currentModalComponent}
                    </div>
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
    }
}

DiscoveryApp.STATE = {
    currentModalComponent: {
        value: null
    }
};

export {DiscoveryApp};
export default DiscoveryApp;