import React from 'react';
import { InjectAppServices, AppServices } from './pure-di';
import { withRouter } from 'react-router';
import queryString from 'query-string';

const DopplerOriginLocalStorageKey = 'dopplerOrigin.value';
const DopplerOriginDateLocalStorageKey = 'dopplerOrigin.date';

let originCache:
  | { readonly stored: true; readonly value: string; readonly unknown?: false }
  | { readonly stored: false; readonly value?: undefined; readonly unknown?: undefined }
  | { readonly unknown: true } = {
  unknown: true,
};

function ensureOriginCache(localStorage: Storage) {
  if (originCache.unknown) {
    const value = localStorage.getItem(DopplerOriginLocalStorageKey);
    originCache = value ? { stored: true, value: value } : { stored: false };
  }
  return originCache;
}

export class OriginResolver {
  constructor(private localStorage: Storage) {}

  getOrigin = () => ensureOriginCache(this.localStorage).value;
}

export function extractOrigin(location: Location | null): string | null {
  const parsedQuery = location && location.search && queryString.parse(location.search);
  return ((parsedQuery && (parsedQuery['origin'] || parsedQuery['Origin'])) || null) as
    | string
    | null;
}

function _OriginCatcher({
  dependencies: { localStorage },
  location,
}: {
  dependencies: AppServices;
  location: Location;
}) {
  const output = <></>;

  const originFromUrl = extractOrigin(location);

  if (!originFromUrl) {
    return output;
  }

  // Optimization to avoid too much local storage usage
  const cache = ensureOriginCache(localStorage);

  if (!cache.stored) {
    localStorage.setItem(DopplerOriginLocalStorageKey, originFromUrl);
    localStorage.setItem(DopplerOriginDateLocalStorageKey, new Date().toUTCString());
    originCache = { stored: true, value: originFromUrl };
  }

  return output;
}

export const OriginCatcher = withRouter(InjectAppServices(_OriginCatcher));
