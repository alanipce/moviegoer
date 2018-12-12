import JSXComponent from 'metal-jsx';

import FeaturedMovieOverview from './FeaturedMovieOverview';

class DiscoveryApp extends JSXComponent {
    render() {
        return (
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                </header>
                <main>
                    <FeaturedMovieOverview />
                </main>
            </div>
        );
    }
}

export {DiscoveryApp};
export default DiscoveryApp;