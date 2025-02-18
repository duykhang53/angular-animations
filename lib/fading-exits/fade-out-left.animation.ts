import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';
import { IAnimationOptions, useAnimationIncludingChildren } from 'angular-animations/lib/common';

export interface IFadeOutLeftAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const fadeOutLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
        style({ opacity: 0, transform: 'translate3d(-{{translate}}, 0, 0)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function fadeOutLeftAnimation(options?: IFadeOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutLeft', [
    transition('0 => 1', [...useAnimationIncludingChildren(fadeOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}

export function fadeOutLeftOnLeaveAnimation(options?: IFadeOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutLeftOnLeave', [
    transition(':leave', [...useAnimationIncludingChildren(fadeOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}
