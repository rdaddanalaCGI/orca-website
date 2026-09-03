import type { ReactNode } from 'react'

import '@payloadcms/next/css'

import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import config from '@/payload.config'
import { importMap } from './admin/importMap'
import './admin.css'

type Args = {
  children: ReactNode
}

export default function PayloadRootLayout({ children }: Args) {
  const serverFunction: ServerFunctionClient = async ({ name, args }) => {
    'use server'
    return handleServerFunctions({
      args,
      config,
      importMap,
      name,
    })
  }

  return RootLayout({
    children,
    config,
    htmlProps: {},
    importMap,
    serverFunction,
  })
}
