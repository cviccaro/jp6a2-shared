import { Subscription } from 'rxjs/Subscription';

export interface RegistersSubscribers {
	_subscriptions: Subscription[];
	registerSubscriber?(sub: Subscription): void;
	ngOnDestroy(): void;
}
