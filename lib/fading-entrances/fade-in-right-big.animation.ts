import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';
import { IAnimationOptions, useAnimationIncludingChildren } from 'angular-animations/lib/common';

export interface IFadeInRightBigAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 2000px
   */
  translate?: string;
}

const fadeInRightBig = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ visibility: 'visible', opacity: 0, transform: 'translate3d({{translate}}, 0, 0)', easing: 'ease', offset: 0 }),
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function fadeInRightBigAnimation(options?: IFadeInRightBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInRightBig', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(fadeInRightBig(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}

export function fadeInRightBigOnEnterAnimation(options?: IFadeInRightBigAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInRightBigOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(fadeInRightBig(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}
