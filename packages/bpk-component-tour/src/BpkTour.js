/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import { withScrim } from 'bpk-scrim-utils';
import BpkPopover from 'bpk-component-popover';
import BpkButton from 'bpk-component-button';
import STYLES from './BpkTour.scss';

const getClassName = cssModules(STYLES);

const Scrim = withScrim(() => null);

export type Props = {
  isOpen: boolean,
  onClose: ?func,
  steps: [{ target: func, label: string, children: Node }],
  prevButtonLabel: ?node,
  nextButtonLabel: ?node,
};

class BpkTour extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  componentDidMount() {
    document.documentElement.classList.add(
      getClassName('bpk-tour-root-node--active'),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStepTarget = prevProps.steps[prevState.activeStep].target();
    const curStepTarget = this.props.steps[this.state.activeStep].target();
    const targetActiveClassName = getClassName('bpk-tour-step-target--active');
    if (prevStepTarget) {
      prevStepTarget.classList.remove(targetActiveClassName);
    }
    if (curStepTarget) {
      curStepTarget.classList.add(targetActiveClassName);
    }
  }

  componentWillUnmount() {
    document.documentElement.classList.remove(
      getClassName('bpk-tour-root-node--active'),
    );
  }

  onPrevButtonClick = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep - 1,
    }));
  };

  onNextButtonClick = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
    }));
  };

  onClose = () => {
    this.setState(
      {
        activeStep: 0,
      },
      this.props.onClose,
    );
  };

  renderTarget = (): HTMLElement =>
    document.getElementById('bpk-tour-popover-container');

  render() {
    const {
      isOpen,
      showScrim,
      steps,
      prevButtonLabel,
      nextButtonLabel,
      getApplicationElement,
    } = this.props;
    const { activeStep } = this.state;

    const step = steps[activeStep];
    if (!step) {
      return null;
    }

    const hasNext = activeStep < steps.length - 1;
    const hasPrev = activeStep > 0;
    const { children, ...stepProps } = step;

    return (
      <div id="bpk-tour-popover-container">
        {isOpen &&
          showScrim && (
            <Scrim
              getApplicationElement={getApplicationElement}
              onClose={this.onClose}
            />
          )}
        <BpkPopover
          id="bpk-tour-popover"
          closeButtonText="Close"
          isOpen={isOpen}
          onClose={this.onClose}
          renderTarget={this.renderTarget}
          portalClassName={getClassName('bpk-tour-portal')}
          labelAsTitle
          className={getClassName('bpk-tour-popover')}
          {...stepProps}
        >
          {children}
          <footer className={getClassName('bpk-tour-popover__footer')}>
            {hasPrev && (
              <BpkButton
                link
                onClick={this.onPrevButtonClick}
                className={getClassName(
                  'bpk-tour-popover__button-prev',
                  hasNext && 'bpk-tour-popover__button-prev--has-next',
                )}
              >
                {prevButtonLabel}
              </BpkButton>
            )}
            {hasPrev && hasNext && '|'}
            {hasNext && (
              <BpkButton
                link
                onClick={this.onNextButtonClick}
                className={getClassName(
                  'bpk-tour-popover__button-next',
                  hasPrev && 'bpk-tour-popover__button-next--has-prev',
                )}
              >
                {nextButtonLabel}
              </BpkButton>
            )}
          </footer>
        </BpkPopover>
      </div>
    );
  }
}

BpkTour.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  getApplicationElement: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      target: PropTypes.func,
      label: PropTypes.string,
      children: PropTypes.node,
    }).isRequired,
  ).isRequired,
  prevButtonLabel: PropTypes.node,
  nextButtonLabel: PropTypes.node,
  showScrim: PropTypes.bool,
};

BpkTour.defaultProps = {
  onClose: null,
  prevButtonLabel: 'Prev',
  nextButtonLabel: 'Next',
  showScrim: true,
};

export default BpkTour;
