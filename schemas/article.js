import {EyeOpenIcon, DocumentIcon} from '@sanity/icons'
import {ArticlePreview} from '../components/views/ArticlePreview'
import {JsonView} from '../components/views/JsonView'
import S from '@sanity/desk-tool/structure-builder'
import articleIcon from '../components/icons/articleIcon'

export default {
  name: 'article',
  type: 'document',
  title: 'Artículo',
  icon: articleIcon,
  views: [
    S.view.component(ArticlePreview).title('Preview').icon(EyeOpenIcon),
    S.view.component(JsonView).title('JSON').icon(DocumentIcon),
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Título',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      type: 'reference',
      title: 'Autor',
      to: [{type: 'author'}],
    },
    {
      name: 'body',
      title: 'Cuerpo',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
        {
          type: 'object',
          title: 'Servicios Disponibles',
          name: 'services',
          preview: {
            select: {
              // Pick the first product image to show
              // This special syntax can be used to tell the studio to automatically resolve the reference before getting the image
              firstServiceVariantMedia: 'services.0.variants.0.picture',
              // Pick all product names
              serviceName0: 'services.0.name',
              serviceName1: 'services.1.name',
              serviceName2: 'services.2.name',
              // Pick the variants field from all referenced products
              serviceVariants0: 'services.0.variants',
              serviceVariants1: 'services.1.variants',
              serviceVariants2: 'services.2.variants',
            },
            prepare({
              firstServiceVariantMedia,
              serviceName0,
              serviceName1,
              serviceName2,
              serviceVariants0,
              serviceVariants1,
              serviceVariants2,
            }) {
              // Gather product names to show them as comma separated list
              const serviceNames = [serviceName0, serviceName1, serviceName2]
                .filter(Boolean)

                // Gather product variants so we can get price range from them
                .join(', ')

              return {
                title: serviceNames,
                media: firstServiceVariantMedia,
              }
            },
          },
          fields: [
            {
              name: 'introduction',
              title: 'Introducción',
              type: 'simpleBlockContent',
            },
            {
              name: 'services',
              title: 'Servicios',
              description: 'Pick between 1 and 3 services to highlight in the preview tab.',
              type: 'array',
              validation: (Rule) => Rule.required().min(1).max(3),
              of: [
                {
                  type: 'reference',
                  to: [{type: 'service'}],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
