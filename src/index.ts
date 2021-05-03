import fetch from 'node-fetch';

export default class Mailcoach {
  private host: string;
  private apiToken: string;

  constructor({ host, apiToken }: InitOptions) {
    this.host = host;
    this.apiToken = apiToken;
  }

  async findSubscriber(options: FindSubscriberOptions): Promise<FindSubscriberResponse | null> {
    const queryParams = `filter[search]=${options.email}`;
    const url = `${this.host}/api/email-lists/${options.emailListId}/subscribers?${queryParams}`;
    const { data } = await this.get(url).then<SubscriberListResponse>((r) => r.json());
    const subscriber = data.find((subscriber) => subscriber.email === options.email);

    if (!subscriber) return null;

    return {
      id: subscriber.id,
      emailListId: subscriber.email_list_id,
      email: subscriber.email,
      firstName: subscriber.first_name,
      lastName: subscriber.last_name,
      extraAttributes: subscriber.extra_attributes,
      tags: subscriber.tags,
      uuid: subscriber.uuid,
      subscribedAt: subscriber.subscribed_at,
      unsubscribedAt: subscriber.unsubscribed_at,
      createdAt: subscriber.created_at,
      updatedAt: subscriber.updated_at,
    };
  }

  subscribeToEmailList(options: SubscribeToEmailListOptions) {
    const body = {
      email_list_id: options.emailListId,
      email: options.emailListId,
      first_name: options.firstName,
      last_name: options.lastName,
      extra_attributes: options.extraAttributes,
      tags: options.tags,
    };

    const url = `${this.host}/api/email-lists/${options.emailListId}/subscribers`;
    return this.post(url, body).then((r) => r.json());
  }

  unsubscribeFromEmailList(options: UnsubscribeFromEmailListOptions) {
    const url = `${this.host}/api/subscribers/${options.subscriberId}/unsubscribe`;
    return this.post(url).then((r) => r.json());
  }

  private get(url: string) {
    return fetch(url, { headers: this.getDefaultHeaders() });
  }

  private post(url: string, body?: Object) {
    return fetch(url, { method: 'POST', body: JSON.stringify(body), headers: this.getDefaultHeaders() });
  }

  private getDefaultHeaders() {
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

type InitOptions = {
  host: string;
  apiToken: string;
};

export type SubscribeToEmailListOptions = {
  emailListId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  extraAttributes?: any[];
  tags?: any[];
};

export type UnsubscribeFromEmailListOptions = {
  subscriberId: number;
};

export type FindSubscriberOptions = {
  emailListId: number;
  email: string;
};

export type FindSubscriberResponse = {
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

// Mailcoach API Interfaces
export type SubscriberListResponse = {
  data: Subscriber[];
  links: Links;
  meta: Meta;
};

export type Subscriber = {
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

export type Links = {
  first: string;
  last: string;
  prev: null;
  next: null;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
};
