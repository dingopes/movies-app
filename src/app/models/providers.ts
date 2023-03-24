export interface MediaProviders {
  id: number;
  results: {
    [key: string]: {
      link: string;
      buy?: {
        [key: string]: MediaProviderLink;
      };
      flatrate?: {
        [key: string]: MediaProviderLink;
      };
      rent?: {
        [key: string]: MediaProviderLink;
      };
    };
  };
}

export interface MediaProviderLink {
  display_priority: number;
  logo_patch: string;
  provider_id: number;
  provider_name: string;
}

export interface MediaProvidersLists {
  buy: MediaProviderLink[];
  flatrate: MediaProviderLink[];
  rent: MediaProviderLink[];
}
