import nodeFetch, { RequestInit } from "node-fetch";
export default class Mailcoach {
  private host: string;
  private apiToken: string;

  constructor({ host, apiToken }: InitOptions) {
    this.host = host;
    this.apiToken = apiToken;
  }

  async findSubscriber(options: FindSubscriberOptions) {
    try {
      const queryParams = `filter[search]=${options.email}`;
      const url = `${this.host}/api/email-lists/${options.emailListId}/subscribers?${queryParams}`;
      const { data } = await this.fetch(url).then<SubscriberListResponse>((r) =>
        r.json()
      );
      const subscriber = data.find(
        (subscriber) => subscriber.email === options.email
      );
      return subscriber
        ? {
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
          }
        : undefined;
    } catch (error) {
      console.error(error);
    }
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

    try {
      const url = `${this.host}/api/email-lists/${options.emailListId}/subscribers`;
      const requestOptions = { method: "POST", body: JSON.stringify(body) };
      return this.fetch(url, requestOptions).then((r) => r.json());
    } catch (error) {
      console.error(error);
    }
  }

  unsubscribeFromEmailList(options: UnsubscribeFromEmailListOptions) {
    try {
      const url = `${this.host}/api/subscribers/${options.subscriberId}/unsubscribe`;
      const requestOptions = { method: "POST" };
      return this.fetch(url, requestOptions).then((r) => r.json());
    } catch (error) {
      console.error(error);
    }
  }

  private fetch(url: string, options?: RequestInit) {
    return nodeFetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
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

export type SubscriberListResponse = {
  data: Subscriber[];
  links: Links;
  meta: Meta;
};

// Mailcoach API Interfaces
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
  unsubscribed_at: null;
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
