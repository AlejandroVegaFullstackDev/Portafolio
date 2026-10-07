// Utilidades del blog compartidas por el home y /blog.
import { getCollection } from 'astro:content';

export { fmtPostDate, fmtLongDate, getToc, readingTime } from './text';

export async function getSortedPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
