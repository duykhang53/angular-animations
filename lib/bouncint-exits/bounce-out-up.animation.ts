import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger, useAnimation, group } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces'

const bounceOutUp = animation(group([
  animate(
    '{{duration}}ms {{delay}}ms',
    keyframes([
      style({transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0  }),
      style({transform: 'translate3d(0, -10px, 0)', easing: 'ease', offset: 0.2  }),
      style({transform: 'translate3d(0, 20px, 0)', easing: 'ease', offset: 0.4  }),
      style({transform: 'translate3d(0, 20px, 0)', easing: 'ease', offset: 0.45  }),
      style({transform: 'translate3d(0, -2000px, 0)', easing: 'ease', offset: 1  }),
    ])
  ),
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({opacity: 1, easing: 'ease', offset: 0  }),
        style({opacity: 1, easing: 'ease', offset: 0.45  }),
        style({opacity: 0, easing: 'ease', offset: 1  }),
      ])
    )
  ])  
]));

const DEFAULT_DURATION = 1000;

export function bounceOutUpAnimation(options?: IAnimationOptions): AnimationTriggerMetadata {
  return trigger(options && options.anchor || 'bounceOutUp', [
    transition(
      '0 <=> 1',
      [
        useAnimation(bounceOutUp, {
          params: {
            duration: (options && options.duration) || DEFAULT_DURATION,
            delay: (options && options.delay) || 0
          }
        })
      ]
    )
  ]);
}


export function bounceOutUpOnLeaveAnimation(options?: IAnimationOptions): AnimationTriggerMetadata {
  return trigger(options && options.anchor || 'bounceOutUpOnLeave', [
    transition(':leave',
      [
        useAnimation(bounceOutUp, {
          params: {
            duration: (options && options.duration) || DEFAULT_DURATION,
            delay: (options && options.delay) || 0
          }
        })
      ]
    )
  ]);
}