"use client"

import posthog from 'posthog-js'
import { PostHogProvider as Provider } from 'posthog-js/react'
import type { ReactNode } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })
}
export function PostHogProvider({ children }: {children: ReactNode}) {
    return <Provider client={posthog}>{children}</Provider>
}
