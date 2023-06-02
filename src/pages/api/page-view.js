import { supabase } from 'src/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { referrer, title } = req.body

  // Fetch the page ID based on the title
  const { data: page, error } = await supabase
    .from('groffdev_pages')
    .select('id')
    .eq('title', title)

  if (error || !page) {
    return res.status(400).json({ error: 'Page not found' })
  }

  // Insert the page view
  const { error: insertError } = await supabase
    .from('groffdev_page_views')
    .insert([
      {
        page_id: page[0].id,
        referrer: referrer,
      },
    ])

  if (insertError) {
    return res.status(500).json({ error: insertError.message })
  }

  return res.status(200).json({ message: `Page view recorded for ${title}` })
}
