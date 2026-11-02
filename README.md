# Bonenbakkie

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-w4jgzfre)

## Site gallery

Admin gallery images are stored in the Supabase `site-gallery` Storage bucket and
`gallery_images` table so they are shared across visitors and devices. Apply the
SQL migration in `supabase/migrations`, deploy the `manage-gallery` Edge
Function, and set its `ADMIN_PASSWORD` secret to the admin login password before
using gallery uploads. The function also needs the standard
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets.

On the first admin login after deployment, gallery entries saved in that
browser's local storage are imported into Supabase. Sfeer gallery uploads are
shown on both the homepage gallery and the `/sfeer` page.

The admin panel manages the sfeer slideshow and event albums separately. Apply
the latest migration and deploy `manage-gallery` after pulling changes:

```sh
npx supabase db push
npx supabase functions deploy manage-gallery
```
