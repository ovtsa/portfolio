import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

export const routeFade = trigger('routeFade', [
    transition("* => *", [
        query(':enter', [style({ opacity: 0, position: 'absolute'})], { optional: true }),
        query(':leave', [style({ opacity: 1 }), animate('150ms', style({ opacity: 0, position: 'absolute' }))], { optional: true }),
        query(':enter', [style({ opacity: 0 }), animate('150ms', style({ opacity: 1, position: 'relative' }))], { optional: true })
    ])
]);