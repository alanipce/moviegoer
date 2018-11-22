import JSXComponent from 'metal-jsx';

class MultiStepIndicator extends JSXComponent {
    render() {
        const {steps, currentStep} = this.props;

        return (
            <ol class="multistep">
                {steps.map((s, i) => {
                    let className = "step";

                    if (i < currentStep) {
                        className += " step__complete";
                    } else if (i === currentStep) {
                        className += " step__current";
                    }

                    return <li class={className}>{s.name} </li>;
                })}
            </ol>
        );
    }
}

MultiStepIndicator.PROPS = {
    steps: {
        value: []
    },
    currentStep: {
        value: null
    }
};

export default MultiStepIndicator;