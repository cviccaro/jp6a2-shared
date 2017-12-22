import 'hammerjs';

export class HammerConfig {

    buildHammer(element: HTMLElement): any {
        const mc = new Hammer.Manager(element);

        // mc.get('pinch').set({ enable: true });
        // mc.get('rotate').set({ enable: true });

        mc.add( new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 0}) );

        // for (let eventName in this.overrides) {
        //     mc.get(eventName).set(this.overrides[eventName]);
        // }

        return mc;
    }
}
