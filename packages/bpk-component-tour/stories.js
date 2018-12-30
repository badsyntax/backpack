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

import React, { Fragment, Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';
import { storiesOf } from '@storybook/react';

import STYLES from './stories.scss';
import BpkTour from './index';

const getClassName = cssModules(STYLES);

const steps = [
  {
    target: () => document.getElementById('step-1'),
    label: 'Toggle content',
    children:
      'This feature will toggle some content. Click on the button to view.',
  },
  {
    target: () => document.getElementById('step-2'),
    label: 'Text info',
    children: 'Some help on this text',
  },
  {
    target: () => document.getElementById('step-3'),
    label: 'Second button',
    children: 'Some help on this second button',
  },
];

class TourContainer extends Component<Props, State> {
  state = {
    showTour: false,
    showContent: false,
  };

  onClose = () => {
    this.setState({
      showTour: false,
    });
  };

  onToggleContentButtonClick = () => {
    this.setState(({ showContent }) => ({
      showContent: !showContent,
    }));
  };

  startTour = () => {
    this.setState({
      showTour: true,
    });
  };

  render() {
    /* eslint-disable no-alert */

    return (
      <div id="root">
        <BpkTour
          steps={steps}
          isOpen={this.state.showTour}
          onClose={this.onClose}
          getApplicationElement={() => document.getElementById('root')}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BpkText textStyle="xxl" tagName="h1">
            Fancy App
          </BpkText>
          <div>
            <BpkButton large onClick={this.startTour}>
              Start Tour
            </BpkButton>
          </div>
        </div>
        <br />
        <div id="step-1" style={{ display: 'inline-block' }}>
          <BpkButton onClick={this.onToggleContentButtonClick}>
            Toggle content
          </BpkButton>
          {this.state.showContent && <div>Here is some content</div>}
        </div>
        <BpkText id="step-2" style={{ float: 'right' }}>
          Text 1
        </BpkText>
        <div style={{ height: '100vh' }} />
        <BpkButton id="step-3">Button 2</BpkButton>
      </div>
    );
  }
}

const Spacer = props => (
  <div className={getClassName('bpk-tour-spacer')} {...props} />
);

storiesOf('bpk-component-tour', module).add('Default', () => (
  <Spacer>
    <TourContainer />
  </Spacer>
));
