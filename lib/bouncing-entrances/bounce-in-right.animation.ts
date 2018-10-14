import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger, useAnimation, group } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces'
import { bounceInOpacity } from './utils';

const bounceInRightTransition = animation([
  animate(
    '{{duration}}ms',
    keyframes([
      style({transform: 'translate3d(3000px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0  }),
      style({transform: 'translate3d(-25px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6  }),
      style({transform: 'translate3d(10px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.75  }),
      style({transform: 'translate3d(-5px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.9  }),
      style({transform: 'translate3d(0, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1  }),
    ])
  )
]);

const DEFAULT_DURATION = 1000;

export function bounceInRightAnimation(options?: IAnimationOptions): AnimationTriggerMetadata {
  return trigger(options && options.anchor || 'bounceInRight', [
    transition(
      '0 <=> 1',
      [
        group([
          useAnimation(bounceInRightTransition),
          useAnimation(bounceInOpacity)
        ], {
            params: {
              duration: (options && options.duration) || DEFAULT_DURATION
            }
        })
      ]
    )
  ]);
}