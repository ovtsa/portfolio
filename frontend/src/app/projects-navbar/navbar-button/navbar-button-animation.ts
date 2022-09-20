import { animate, state, style, query, transition, trigger } from "@angular/animations";

export const navButtonAnimation = trigger('navButtonAnimation', [


    state('deselected', style({
        //position: "absolute",
        opacity: .5
        //transform: "translateX(0)"
    })),
    state('selected', style({
        opacity: 1
        //transform: "translateX(100)"
    })),
    transition('deselected <=> selected', animate('150ms'))
   
    /*
    transition('deselected => selected', [
        query('img', [
            style({ opacity: 0 }),
            animate('500ms', style({ opacity: 1 })),
            //style({ position: 'relative' })
        ]),
        query('div', [
            style({ transform: "translateX(30px)"}),
        ])
    ])
    */
]);