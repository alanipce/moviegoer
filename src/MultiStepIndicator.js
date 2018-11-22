import JSXComponent from 'metal-jsx';

class MultiStepIndicator extends JSXComponent {
    render() {
        const {steps, currentStep} = this.props;

        return (
            <ol>
                {steps.map((s, i) => <li>{s.name} {(i===currentStep)? ' (current)' : ''}</li>)}
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