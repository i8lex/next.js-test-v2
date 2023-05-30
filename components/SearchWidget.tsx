import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { GetUsers } from '@/types';
import { User } from '@/types';
import { useDebounceValue } from '@/hooks/useDebounceValue';

export const SearchWidget = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query, 500);
  const [results, setResults] = useState<User[]>([]);
  const [selectedResult, setSelectedResult] = useState(0);
  const [widgetIsActive, setWidgetIsActive] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const [cache, setCache] = useState<Record<string, User[]>>({});

  const abortController = useRef(new AbortController()); // Добавьте эту строку

  useEffect(() => {
    const getUsers = async (): Promise<GetUsers | void>=> {
      abortController.current.abort();
      const controller = new AbortController();
      abortController.current = controller;

      const { signal } = controller;

      if (debouncedQuery.length < 1 && widgetIsActive) {
        if (cache['']) {
          setResults(cache['']);
        } else {
          try {
            const response = await axios.get(
              process.env.NEXT_PUBLIC_BASE_API_URL as string,
              {
                params: { limit: 10, skip: 0 },
                signal,
              },
            );
            setResults(response.data.users);
            setCache({ ...cache, '': response.data.users });
          } catch (error) {}
        }
        return;
      }
      if (debouncedQuery.length > 0 && widgetIsActive) {
        if (cache[debouncedQuery]) {
          setResults(cache[debouncedQuery]);
        } else {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_API_URL}/search?q=${debouncedQuery}&limit=10`,
              { signal },
            );
            setResults(response.data.users);
            setCache({ ...cache, [debouncedQuery]: response.data.users });
          } catch (error) {}
        }
      }
      return;
    };

    getUsers().then();

    return () => {
      abortController.current.abort();
    };
  }, [widgetIsActive, debouncedQuery, cache]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event && event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedResult((prev) =>
        prev !== -1 ? Math.min(prev + 1, results.length - 1) : -1,
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();

      setSelectedResult((prev) => (prev !== -1 ? Math.max(prev - 1, 0) : -1));
    } else if (event.key === 'Enter' && selectedResult !== -1) {
      event.preventDefault();
      const user = results[selectedResult] as User;
      router.push(`/user/${user.id}`).then();
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2 justify-center mb-3 relative w-52">
        <div className="relative flex-1 w-52">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setTimeout(() => {
                setWidgetIsActive(false);
              }, 100);
            }}
            onFocus={() => {
              setWidgetIsActive(true);
            }}
            name="search"
            placeholder="search users"
            className="border rounded-md pl-10 pr-2 py-2 text-base text-gray-600"
            ref={inputRef}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400 font-medium text-2xl text-md" />
          </div>
        </div>

        {results.length && widgetIsActive ? (
          <ul className="absolute w-52 z-10 top-full left-0 right-0 bg-white border rounded-md overflow-hidden">
            {results.map((user, index) => (
              <li key={user.id}>
                <Link
                  href={`/user/${user.id}`}
                  className={clsx(
                    'block px-4 py-2 hover:bg-gray-100 border rounded-md',
                    selectedResult === index ? 'bg-gray-100' : null,
                  )}
                >
                  {user.firstName} {user.lastName}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
