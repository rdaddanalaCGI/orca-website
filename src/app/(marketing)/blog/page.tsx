import NextLink from 'next/link'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { JsonLd } from '@/components/seo/json-ld'
import { cmsAuthorName, getCategories, getPublishedPosts } from '@/lib/payload'
import { breadcrumbJsonLd, createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Insights',
  description: 'Stay informed with the latest news, thought leadership, and AI innovations from Orcaworks.',
  path: '/blog',
})

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function normalizeParam(value: string | string[] | undefined): string | undefined {
  const first = Array.isArray(value) ? value[0] : value
  return typeof first === 'string' && first.trim() ? first.trim() : undefined
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const pageParam = normalizeParam(params.page)
  const categorySlug = normalizeParam(params.category)
  const searchQuery = normalizeParam(params.search)

  const pageNumber = pageParam ? Number(pageParam) : 1
  const currentPage = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber

  const [categories, { docs, totalPages, page: resultPage }] = await Promise.all([
    getCategories(),
    getPublishedPosts({
      limit: 10,
      page: currentPage,
      categorySlug,
      search: searchQuery,
    }),
  ])

  function buildHref({ page = 1, category, search }: { page?: number; category?: string; search?: string }): string {
    const query = new URLSearchParams()
    if (category) query.set('category', category)
    if (search) query.set('search', search)
    if (page > 1) query.set('page', String(page))
    return query.size ? `/blog?${query.toString()}` : '/blog'
  }

  const hasPosts = docs.length > 0

  return (
    <>
      <section className="py-16">
        <Container className="flex flex-col gap-10 sm:gap-16">
          <div className="flex max-w-2xl flex-col gap-6">
            <Heading>Insights</Heading>
            <p className="text-lg/8 text-pretty text-olive-700 dark:text-olive-400">
              Stay informed with the latest news, thought leadership, and AI innovations from Orcaworks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {hasPosts ? (
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {docs.map((post) => (
                    <li key={post.slug}>
                      <article className="group flex h-full flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                          {post.categories
                            ?.filter(
                              (c): c is { id: number | string; name: string; slug: string } =>
                                typeof c === 'object' && c !== null && 'name' in c,
                            )
                            .map((category) => (
                              <NextLink
                                key={category.slug}
                                href={buildHref({ category: category.slug, search: searchQuery })}
                                className="rounded-full bg-orca-teal-dark px-3 py-1 text-xs font-medium text-white hover:bg-orca-teal-dark/90"
                              >
                                {category.name}
                              </NextLink>
                            ))}
                        </div>
                        <h3 className="font-display text-2xl/8 text-olive-950 dark:text-white">
                          <NextLink href={`/blog/${post.slug}`} className="group-hover:underline">
                            {post.title}
                          </NextLink>
                        </h3>
                        <p className="text-sm text-olive-600 dark:text-olive-400">
                          {formatDate(post.publishedDate)}
                          {cmsAuthorName(post.author) ? ` · ${cmsAuthorName(post.author)}` : null}
                          {post.readingTime ? ` · ${post.readingTime} min read` : null}
                        </p>
                        {post.excerpt ? (
                          <p className="text-base/7 text-olive-700 dark:text-olive-400">{post.excerpt}</p>
                        ) : null}
                        <div className="mt-auto pt-2">
                          <NextLink
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-sm font-medium text-orca-orange hover:text-orca-orange-hover hover:underline"
                          >
                            Read More
                          </NextLink>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text>No published posts found.</Text>
              )}

              {totalPages > 1 ? (
                <nav className="mt-10 flex flex-wrap items-center gap-2" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <NextLink
                      key={page}
                      href={buildHref({ page, category: categorySlug, search: searchQuery })}
                      className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                        page === resultPage
                          ? 'bg-olive-950 text-white dark:bg-white dark:text-olive-950'
                          : 'bg-olive-200 text-olive-950 hover:bg-olive-300 dark:bg-olive-800 dark:text-white dark:hover:bg-olive-700'
                      }`}
                      aria-current={page === resultPage ? 'page' : undefined}
                    >
                      {page}
                    </NextLink>
                  ))}
                </nav>
              ) : null}
            </div>

            <aside className="flex flex-col gap-8">
              <div className="rounded-2xl bg-olive-200/50 p-6 dark:bg-olive-900/50">
                <h2 className="mb-4 font-display text-xl text-olive-950 dark:text-white">Search</h2>
                <form action="/blog" method="get" className="flex flex-col gap-3">
                  {categorySlug ? <input type="hidden" name="category" value={categorySlug} /> : null}
                  <input
                    type="search"
                    name="search"
                    defaultValue={searchQuery ?? ''}
                    placeholder="Search insights"
                    className="rounded-lg border border-olive-300 bg-white px-4 py-2 text-sm text-olive-950 placeholder:text-olive-500 focus:border-orca-orange focus:outline-none dark:border-olive-700 dark:bg-olive-950 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-orca-orange px-4 py-2 text-sm font-medium text-white hover:bg-orca-orange-hover"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="rounded-2xl bg-olive-200/50 p-6 dark:bg-olive-900/50">
                <h2 className="mb-4 font-display text-xl text-olive-950 dark:text-white">Categories</h2>
                <ul className="flex flex-col gap-2">
                  <li>
                    <NextLink
                      href={buildHref({ search: searchQuery })}
                      className={`text-sm ${
                        !categorySlug
                          ? 'font-semibold text-orca-orange'
                          : 'text-olive-700 hover:text-orca-orange dark:text-olive-400'
                      }`}
                    >
                      All
                    </NextLink>
                  </li>
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <NextLink
                        href={buildHref({ category: category.slug, search: searchQuery })}
                        className={`text-sm ${
                          category.slug === categorySlug
                            ? 'font-semibold text-orca-orange'
                            : 'text-olive-700 hover:text-orca-orange dark:text-olive-400'
                        }`}
                      >
                        {category.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-olive-200/50 p-6 dark:bg-olive-900/50">
                <h2 className="mb-4 font-display text-xl text-olive-950 dark:text-white">Expert Column</h2>
                <NextLink
                  href="/expert-column/abhinav-somaraju"
                  className="text-sm text-olive-700 hover:text-orca-orange dark:text-olive-400"
                >
                  Dr. Abhinav Somaraju
                </NextLink>
              </div>

              <div className="rounded-2xl bg-olive-200/50 p-6 dark:bg-olive-900/50">
                <h2 className="mb-4 font-display text-xl text-olive-950 dark:text-white">Newsletter</h2>
                <p className="text-sm text-olive-700 dark:text-olive-400">
                  Sign up for the latest news, updates, tips and advice.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
        ])}
      />
    </>
  )
}
