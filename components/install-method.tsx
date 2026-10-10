'use client';

import { useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';

// One install-method choice for the whole site: the switch at the top of a page sets it,
// every <Method> block in that page's steps shows or hides by it, and it's remembered for
// the next page (installation → reverse proxy).

type InstallMethod = 'same' | 'separate';

const STORAGE_KEY = 'remnashop-install-method';
const listeners = new Set<() => void>();

function read(): InstallMethod {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'separate' ? 'separate' : 'same';
  } catch {
    return 'same';
  }
}

function write(method: InstallMethod) {
  try {
    localStorage.setItem(STORAGE_KEY, method);
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // another tab changing it
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function useInstallMethod() {
  return useSyncExternalStore(subscribe, read, () => 'same' as const);
}

// Drawn with the docs-tabs styles (app/global.css), so it matches the other pill tabs.
export function MethodSwitch({ same, separate }: { same: string; separate: string }) {
  const method = useInstallMethod();
  const items: [InstallMethod, string][] = [
    ['same', same],
    ['separate', separate],
  ];
  return (
    <div
      className="docs-tabs docs-method-switch not-prose my-4 flex"
      style={{ '--label-chars': same.length + separate.length } as CSSProperties}
    >
      <div role="tablist" className="flex">
        {items.map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={method === value}
            data-active={method === value ? '' : undefined}
            onClick={() => write(value)}
            className="inline-flex items-center whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Method({ only, children }: { only: InstallMethod; children?: ReactNode }) {
  return useInstallMethod() === only ? <>{children}</> : null;
}
