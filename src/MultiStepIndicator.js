import JSXComponent from 'metal-jsx';

class MultiStepIndicator extends JSXComponent {
    render() {
        const {steps, currentStep} = this.props;

        return (
            <ol class="multistep">
                {steps.map((s, i) => {
                    let className = "step";

                    if (i < currentStep) {
                        className += " step--complete";
                    } else if (i === currentStep) {
                        className += " step--current";
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