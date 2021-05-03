export default class Mailcoach {
    private host;
    private apiToken;
    constructor({ host, apiToken }: InitOptions);
    findSubscriber(options: FindSubscriberOptions): Promise<FindSubscriberResponse | null>;
    subscribeToEmailList(options: SubscribeToEmailListOptions): Promise<any>;
    unsubscribeFromEmailList(options: UnsubscribeFromEmailListOptions): Promise<any>;
    private get;
    private post;
    private getDefaultHeaders;
}
declare type InitOptions = {
    host: string;
    apiToken: string;
};
export declare type SubscribeToEmailListOptions = {
    emailListId: number;
    email: string;
    firstName?: string;
    lastName?: string;
    extraAttributes?: any[];
    tags?: any[];
};
export declare type UnsubscribeFromEmailListOptions = {
    subscriberId: number;
};
export declare type FindSubscriberOptions = {
    emailListId: number;
    email: string;
};
export declare type FindSubscriberResponse = {
    id: number;
    emailListId: number;
    email: string;
    firstName: string;
    lastName: string;
    extraAttributes: any[];
    tags: string[];
    uuid: string;
    subscribedAt: Date;
    unsubscribedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
export declare type SubscriberListResponse = {
    data: Subscriber[];
    links: Links;
    meta: Meta;
};
export declare type Subscriber = {
    id: number;
    email_list_id: number;
    email: string;
    first_name: string;
    last_name: string;
    extra_attributes: any[];
    tags: string[];
    uuid: string;
    subscribed_at: Date;
    unsubscribed_at: Date;
    created_at: Date;
    updated_at: Date;
};
export declare type Links = {
    first: string;
    last: string;
    prev: null;
    next: null;
};
export declare type Meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};
export declare type Link = {
    url: null | string;
    label: string;
    active: boolean;
};
export {};
